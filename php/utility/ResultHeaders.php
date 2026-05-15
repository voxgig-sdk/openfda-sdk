<?php
declare(strict_types=1);

// Openfda SDK utility: result_headers

class OpenfdaResultHeaders
{
    public static function call(OpenfdaContext $ctx): ?OpenfdaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
