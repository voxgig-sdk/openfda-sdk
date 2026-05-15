<?php
declare(strict_types=1);

// Openfda SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

OpenfdaUtility::setRegistrar(function (OpenfdaUtility $u): void {
    $u->clean = [OpenfdaClean::class, 'call'];
    $u->done = [OpenfdaDone::class, 'call'];
    $u->make_error = [OpenfdaMakeError::class, 'call'];
    $u->feature_add = [OpenfdaFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenfdaFeatureHook::class, 'call'];
    $u->feature_init = [OpenfdaFeatureInit::class, 'call'];
    $u->fetcher = [OpenfdaFetcher::class, 'call'];
    $u->make_fetch_def = [OpenfdaMakeFetchDef::class, 'call'];
    $u->make_context = [OpenfdaMakeContext::class, 'call'];
    $u->make_options = [OpenfdaMakeOptions::class, 'call'];
    $u->make_request = [OpenfdaMakeRequest::class, 'call'];
    $u->make_response = [OpenfdaMakeResponse::class, 'call'];
    $u->make_result = [OpenfdaMakeResult::class, 'call'];
    $u->make_point = [OpenfdaMakePoint::class, 'call'];
    $u->make_spec = [OpenfdaMakeSpec::class, 'call'];
    $u->make_url = [OpenfdaMakeUrl::class, 'call'];
    $u->param = [OpenfdaParam::class, 'call'];
    $u->prepare_auth = [OpenfdaPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenfdaPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenfdaPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenfdaPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenfdaPrepareParams::class, 'call'];
    $u->prepare_path = [OpenfdaPreparePath::class, 'call'];
    $u->prepare_query = [OpenfdaPrepareQuery::class, 'call'];
    $u->result_basic = [OpenfdaResultBasic::class, 'call'];
    $u->result_body = [OpenfdaResultBody::class, 'call'];
    $u->result_headers = [OpenfdaResultHeaders::class, 'call'];
    $u->transform_request = [OpenfdaTransformRequest::class, 'call'];
    $u->transform_response = [OpenfdaTransformResponse::class, 'call'];
});
