## Available Voices

​                        alloy                        ash                        ballad                        coral                        echo                        fable                        onyx                        nova                        sage                        shimmer                        verse                    

## API Reference

### Generate Speech (OpenAI Compatible)

```http
POST /v1/audio/speech
```

#### Request Parameters

| Parameter       | Type   | Required | Description                                                                                                                                                              |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| input           | string | Yes      | The text to convert to speech                                                                                                                                            |
| voice           | string | Yes      | The voice to use (see Available Voices)                                                                                                                                  |
| instructions    | string | No       | *Mapped to "prompt" parameter when sent to the backend service. Can be used to guide voice emotion or style.*                                                            |
| response_format | string | No       | *OpenAI compatibility only -  only changes the Content-Type header but not the actual audio format.  May result in incorrect Content-Type headers. Audio is always MP3.* |
| model           | string | No       | *OpenAI compatibility only - completely ignored.*                                                                                                                        |
| speed           | number | No       | *OpenAI compatibility only - completely ignored.*                                                                                                                        |

**Note:** Parameters in gray are completely ignored by the service or may cause misleading behavior. Only `input`, `voice`, and `instructions` affect the actual TTS output.

#### How the Instructions Parameter Works

The `instructions` parameter is mapped to a `prompt` parameter when sent to the backend service. It can be used to guide the voice emotion, tone, or style. Some examples of effective instructions:

- **Emotional guidance:** "Speak in a happy and excited tone."
- **Character impersonation:** "Speak like a wise old wizard."
- **Contextual hints:** "This is being read to a child, speak gently."
- **Reading style:** "Read this as a news broadcast."

**Tip:** Keep instructions clear and concise. Overly complex instructions may not be interpreted correctly.

#### Response Format

The API always returns a binary MP3 audio file with the following headers:

- `Content-Type`: "audio/mpeg"
- `Access-Control-Allow-Origin`: "*" (CORS enabled)

**Important:** While the `response_format` parameter may change the Content-Type header in the response, it does  not actually convert the audio format. The audio is always returned as  MP3 from the upstream service.

#### Error Responses

| Status Code | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| 400         | Missing required parameters (input or voice)                                         |
| 429         | Rate limit exceeded or queue is full. Includes Retry-After header when rate limited. |
| 500         | Internal server error                                                                |

### Queue System

The API uses a queue system to handle multiple requests efficiently:

- Maximum queue size: Configurable via `MAX_QUEUE_SIZE` environment variable (default: 100 requests)
- Requests are processed in FIFO (First In, First Out) order
- Rate limiting: Configurable via `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW` environment variables (default: 30 requests per 60 seconds per IP address)
- Queue status can be monitored via the `/api/queue-size` endpoint
- Queue status updates every 2 seconds in the web interface
- Visual indicators show queue load (Low/Medium/High) based on utilization

#### Queue Status Endpoint

```http
GET /api/queue-size
```

Returns JSON with queue information:

```json
{
    "queue_size": 0,        // Current number of requests in queue
    "max_queue_size": 100   // Maximum queue capacity
}
```

#### Response Status Codes

- `200` - Success
- `429` - Queue is full or rate limit exceeded
- `500` - Server error

#### Queue Load Indicators

- **Low Load** (0-40%): Green indicator, optimal for new requests
- **Medium Load** (40-75%): Yellow/Orange indicator, some delay expected
- **High Load** (75-100%): Red indicator, significant delay expected