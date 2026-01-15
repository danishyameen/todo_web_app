from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response as StarletteResponse
from starlette.types import ASGIApp
import time
import logging
import json

# Configure logger
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


class LoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        start_time = time.time()

        # Log incoming request
        logger.info(f"Incoming request: {request.method} {request.url}")

        try:
            response = await call_next(request)
        except Exception as e:
            # Log exceptions
            logger.error(f"Exception occurred: {str(e)}")
            raise e
        finally:
            # Calculate duration
            duration = time.time() - start_time

            # Log outgoing response
            logger.info(f"Response: {response.status_code} in {duration:.2f}s")

        return response