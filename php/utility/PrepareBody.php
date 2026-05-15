<?php
declare(strict_types=1);

// Openfda SDK utility: prepare_body

class OpenfdaPrepareBody
{
    public static function call(OpenfdaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
