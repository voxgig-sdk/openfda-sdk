<?php
declare(strict_types=1);

// Openfda SDK exists test

require_once __DIR__ . '/../openfda_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenfdaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
