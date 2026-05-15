<?php
declare(strict_types=1);

// Openfda SDK utility: feature_add

class OpenfdaFeatureAdd
{
    public static function call(OpenfdaContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
