<?php
declare(strict_types=1);

// Openfda SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenfdaMakeContext
{
    public static function call(array $ctxmap, ?OpenfdaContext $basectx): OpenfdaContext
    {
        return new OpenfdaContext($ctxmap, $basectx);
    }
}
