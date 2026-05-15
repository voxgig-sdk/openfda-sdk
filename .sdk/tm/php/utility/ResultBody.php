<?php
declare(strict_types=1);

// Openfda SDK utility: result_body

class OpenfdaResultBody
{
    public static function call(OpenfdaContext $ctx): ?OpenfdaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
