import { NextRequest, NextResponse } from 'next/server';
import { IncomingMessage, ServerResponse } from 'http';

/**
 * Convert Next.js NextRequest to Node.js IncomingMessage
 */
export function convertNextRequestToIncomingMessage(nextRequest: NextRequest): IncomingMessage {
   const { headers, method, body } = nextRequest;

   // Create a mock IncomingMessage object
   const req: IncomingMessage = {
      headers: Object.fromEntries(headers.entries()),
      method: method || 'GET',
      // For simplicity, we are assuming no complex body here. Adjust accordingly.
      url: nextRequest.url,
   } as IncomingMessage;

   // Add additional fields required by oidcProvider as needed

   return req;
}

/**
 * Convert Next.js NextResponse to Node.js ServerResponse
 */
export function convertNextResponseToServerResponse(nextResponse: NextResponse): ServerResponse {
   const res = new ServerResponse(null as any); // We use 'null' as the socket for simplicity

   // Set status code
   res.statusCode = nextResponse.status;

   // Set headers
   nextResponse.headers.forEach((value, name) => {
      res.setHeader(name, value);
   });

   // Convert NextResponse body to a format compatible with ServerResponse
   const body = nextResponse.body;
   if (body) {
      // Assuming body is readable stream or string
      res.write(body);
   }

   // Mark response as finished
   res.end();

   return res;
}