import { NextResponse } from 'next/server';
import { EventSource } from 'eventsource'; // For handling streaming

// Langflow Client Class
class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = (event) => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            console.log('Init Response:', initResponse);
            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            throw new Error('Error initiating session');
        }
    }
}

// Environment variables
const BASE_URL = process.env.BASE_URL;
const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;
const FLOW_ID = process.env.FLOW_ID;
const LANGFLOW_ID = process.env.LANGFLOW_ID;

// API Route
export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
    }

    const { inputValue, inputType = 'chat', outputType = 'chat', stream = false } = await req.json();
    // console.log(inputValue, inputType, outputType, stream);
    // return NextResponse.json({ success: true, message: 'API route working' });

    const langflowClient = new LangflowClient(BASE_URL, APPLICATION_TOKEN);

    try {
        const tweaks = {
            "ChatInput-Zvqp4": {},
            "ParseData-bmuuF": {},
            "Prompt-nPeug": {},
            "SplitText-QgyJr": {},
            "OpenAIModel-H9u2C": {},
            "ChatOutput-HjX13": {},
            "AstraDB-kFYYv": {},
            "OpenAIEmbeddings-QvVOu": {},
            "AstraDB-LBn47": {},
            "OpenAIEmbeddings-2gAbb": {},
            "File-7y9jj": {}
        };

        const response = await langflowClient.runFlow(
            FLOW_ID,
            LANGFLOW_ID,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => console.log("Streaming Update:", data.chunk),
            (message) => console.log("Stream Closed:", message),
            (error) => console.error("Stream Error:", error)
        );

        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;

            return NextResponse.json({ success: true, output: output.message.text });
        } else {
            return NextResponse.json({ success: true, message: 'Stream in progress' });
        }
    } catch (error) {
        console.error('Error in API route:', error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}