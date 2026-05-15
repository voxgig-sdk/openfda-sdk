<?php
declare(strict_types=1);

// Openfda SDK base feature

class OpenfdaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenfdaContext $ctx, array $options): void {}
    public function PostConstruct(OpenfdaContext $ctx): void {}
    public function PostConstructEntity(OpenfdaContext $ctx): void {}
    public function SetData(OpenfdaContext $ctx): void {}
    public function GetData(OpenfdaContext $ctx): void {}
    public function GetMatch(OpenfdaContext $ctx): void {}
    public function SetMatch(OpenfdaContext $ctx): void {}
    public function PrePoint(OpenfdaContext $ctx): void {}
    public function PreSpec(OpenfdaContext $ctx): void {}
    public function PreRequest(OpenfdaContext $ctx): void {}
    public function PreResponse(OpenfdaContext $ctx): void {}
    public function PreResult(OpenfdaContext $ctx): void {}
    public function PreDone(OpenfdaContext $ctx): void {}
    public function PreUnexpected(OpenfdaContext $ctx): void {}
}
