<?php
declare(strict_types=1);

// Openfda SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenfdaFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenfdaBaseFeature();
            case "test":
                return new OpenfdaTestFeature();
            default:
                return new OpenfdaBaseFeature();
        }
    }
}
