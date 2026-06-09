import { useEffect, useState } from "react";
import type { Question } from "../../types";

const rawQuestions: Question[] = [
  // ─── DOMAIN 1: Development with AWS Services ───────────────────────────────
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is building a Lambda function that must read a large JSON configuration file (500 KB) on every cold start. The file rarely changes. What is the MOST performance-efficient approach?",
    opts: [
      "Store the file in S3 and download it inside the handler function on every invocation",
      "Package the file inside the Lambda deployment package",
      "Store the file in AWS Lambda Layers and reference it via /opt",
      "Store the file in DynamoDB and call GetItem inside the handler",
    ],
    ans: [2],
    exp: {
      correct: [
        "AWS Lambda Layers -- layers are extracted to /opt in the execution environment and persist across warm invocations. The file is loaded once per container lifecycle, minimizing latency and cold start overhead.",
      ],
      incorrect: [
        "Downloading from S3 on every invocation -- adds network I/O latency to every call and does not leverage Lambda's warm execution environment.",
        "Packaging in the deployment package -- works but bloats the package size and doesn't separate config from code; Layers is the recommended pattern.",
        "DynamoDB GetItem on every invocation -- adds DynamoDB read latency on every call; no benefit over S3 for a rarely changing static file.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A Lambda function needs to process S3 events but is frequently hitting its 15-minute timeout due to slow downstream processing. The downstream system cannot be optimized. What is the BEST architectural fix?",
    opts: [
      "Increase the Lambda timeout beyond 15 minutes",
      "Refactor the function to write a task to an SQS queue and process asynchronously with a separate Lambda",
      "Run the function on a larger memory size to speed up execution",
      "Convert the Lambda to use Provisioned Concurrency",
    ],
    ans: [1],
    exp: {
      correct: [
        "SQS + separate Lambda -- Lambda has a hard 15-minute timeout that cannot be increased. The correct pattern is to decouple the long-running processing via SQS: the first Lambda puts a message on a queue and returns immediately; a second Lambda polls the queue and handles the slow work.",
      ],
      incorrect: [
        "Increasing Lambda timeout beyond 15 minutes -- Lambda's maximum timeout is 15 minutes and cannot be extended.",
        "Larger memory size -- increases CPU proportionally but does not help when the bottleneck is an external downstream system.",
        "Provisioned Concurrency -- eliminates cold starts but does not extend the 15-minute execution limit.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 2,
    question:
      "A developer wants to invoke a Lambda function from an API Gateway REST API endpoint. The function must receive the full HTTP request including headers and query string parameters. Which TWO integration types support passing the full request context? (Select TWO.)",
    opts: [
      "Lambda Proxy Integration",
      "Lambda Custom Integration (non-proxy)",
      "HTTP Proxy Integration",
      "AWS Service Integration",
      "Mock Integration",
    ],
    ans: [0, 1],
    exp: {
      correct: [
        "Lambda Proxy Integration -- API Gateway wraps the entire request (headers, query params, body, method, path) into a standard event object and passes it directly to Lambda. No mapping template needed.",
        "Lambda Custom Integration (non-proxy) -- allows the developer to define mapping templates using Velocity Template Language (VTL) to craft exactly what the Lambda receives, including any headers or query string values.",
      ],
      incorrect: [
        "HTTP Proxy Integration -- forwards requests to an HTTP backend, not a Lambda function.",
        "AWS Service Integration -- used to call other AWS service APIs directly from API Gateway without Lambda.",
        "Mock Integration -- returns a static response from API Gateway without invoking any backend.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer needs to grant a Lambda function permission to write to a specific DynamoDB table. What is the CORRECT and MOST secure way to achieve this?",
    opts: [
      "Embed IAM access keys in the Lambda environment variables",
      "Attach an IAM role with the required DynamoDB permissions to the Lambda execution role",
      "Use the AWS SDK default credentials chain which will automatically discover permissions",
      "Add an IAM user to the Lambda function and hardcode credentials in the code",
    ],
    ans: [1],
    exp: {
      correct: [
        "Lambda execution role -- Lambda assumes an IAM role at runtime. Attaching an IAM policy granting dynamodb:PutItem (or similar) to the execution role is the correct, least-privilege approach. No credentials need to be managed.",
      ],
      incorrect: [
        "Embedding IAM access keys in environment variables -- a security anti-pattern. Keys can be exposed through code or logs.",
        "Default credentials chain -- the chain will ultimately use the execution role, so this statement is imprecise; you still need the role to have the correct permissions attached explicitly.",
        "Adding an IAM user -- hardcoding credentials is a critical security vulnerability and violates AWS best practices.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "An API Gateway REST API is deployed in a region. A mobile client in another continent is experiencing high latency. The API returns dynamic, personalized responses so caching is not appropriate. Which API Gateway feature BEST reduces latency for globally distributed clients?",
    opts: [
      "Enable API Gateway caching with a 5-minute TTL",
      "Deploy the API as an Edge-Optimized endpoint",
      "Use a Regional endpoint combined with Amazon CloudFront",
      "Switch to HTTP API instead of REST API",
    ],
    ans: [1],
    exp: {
      correct: [
        "Edge-Optimized endpoint -- routes client requests through the nearest CloudFront edge location, reducing connection establishment time for globally distributed clients. The API still runs in one region, but TCP/TLS handshake overhead is reduced at the edge.",
      ],
      incorrect: [
        "API Gateway caching -- doesn't help for dynamic, personalized responses since each response is unique.",
        "Regional endpoint + CloudFront -- achieves similar results but requires additional CloudFront distribution setup; Edge-Optimized is the built-in simpler option.",
        "HTTP API -- lower cost and latency than REST API but still a Regional endpoint; doesn't inherently route via edge locations.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is implementing a DynamoDB table for a social media app. User posts need to be retrieved by user ID sorted by post timestamp descending. The table uses userId as the partition key. What must the developer add to support this access pattern efficiently?",
    opts: [
      "A Global Secondary Index (GSI) on userId",
      "A Sort Key of postTimestamp on the base table",
      "A Local Secondary Index (LSI) on postTimestamp",
      "A DynamoDB Stream with a Lambda function that sorts and re-inserts items",
    ],
    ans: [1],
    exp: {
      correct: [
        "Sort Key of postTimestamp -- DynamoDB stores items with the same partition key sorted by the sort key. Querying with userId as PK and sorting by postTimestamp descending with ScanIndexForward=false is the native, most efficient pattern.",
      ],
      incorrect: [
        "GSI on userId -- a GSI requires a different attribute as its PK; querying userId on a GSI when userId is already the base table PK is redundant.",
        "LSI on postTimestamp -- an LSI allows sorting by an alternate key within the same partition. However, LSIs must be defined at table creation time and share the base table's PK. Sort key on the base table is the simpler, more direct solution.",
        "DynamoDB Streams + Lambda to re-sort -- extremely complex and unnecessary; DynamoDB handles sorting natively.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 2,
    question:
      "A developer must ensure that write operations to a DynamoDB table fail if an item with the same primary key already exists. Which TWO approaches enforce this constraint? (Select TWO.)",
    opts: [
      "Use a PutItem call with a ConditionExpression: 'attribute_not_exists(pk)'",
      "Use a TransactWriteItems call with a ConditionCheck verifying the item does not exist",
      "Use a BatchWriteItem call which automatically skips duplicates",
      "Enable DynamoDB Streams and implement duplicate checking in Lambda",
      "Use a Scan before every PutItem to check for duplicates",
    ],
    ans: [0, 1],
    exp: {
      correct: [
        "PutItem with attribute_not_exists(pk) -- DynamoDB's conditional writes allow PutItem to fail with ConditionalCheckFailedException if the specified condition is not met. This is atomic and efficient.",
        "TransactWriteItems with ConditionCheck -- for multi-table or multi-item operations that need atomicity, TransactWriteItems allows embedding a ConditionCheck to verify a key doesn't exist before writing.",
      ],
      incorrect: [
        "BatchWriteItem -- does not support condition expressions; it overwrites or skips silently depending on configuration. It does NOT enforce uniqueness.",
        "DynamoDB Streams + Lambda -- introduces a race condition (check-then-act is not atomic) and significant latency/complexity.",
        "Scan before PutItem -- Scans are expensive (full table read) and introduce a race condition between the check and the write.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer needs to store session data for a web application. The data must be accessible with sub-millisecond latency, expire automatically after 30 minutes of inactivity, and support high throughput. Which solution BEST meets these requirements?",
    opts: [
      "Amazon RDS with a sessions table and scheduled cleanup Lambda",
      "Amazon DynamoDB with TTL enabled on the session items",
      "Amazon ElastiCache for Redis with sliding expiration using EXPIRE command",
      "Amazon S3 with S3 Lifecycle rules to delete old session files",
    ],
    ans: [2],
    exp: {
      correct: [
        "ElastiCache for Redis with EXPIRE -- Redis delivers sub-millisecond latency, supports sliding expiration via the EXPIRE command (reset on each access), handles extremely high throughput, and is purpose-built for session stores.",
      ],
      incorrect: [
        "RDS with scheduled Lambda cleanup -- relational database adds query latency and operational complexity; scheduled cleanup doesn't give 30-minute sliding expiry precision.",
        "DynamoDB with TTL -- DynamoDB TTL is not real-time; items may persist for up to 48 hours after TTL expiry. Latency is single-digit ms, not sub-ms.",
        "S3 with Lifecycle rules -- S3 is not designed for low-latency key-value access; Lifecycle rules operate on days, not minutes.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is using the AWS SDK for Python (boto3) to call DynamoDB. Occasionally the call fails with a ProvisionedThroughputExceededException. What is the CORRECT way to handle this in the application code?",
    opts: [
      "Catch the exception, log it, and immediately retry the request",
      "Implement exponential backoff with jitter before retrying",
      "Switch to DynamoDB on-demand capacity mode in the code",
      "Increase the retry limit in the SDK to 0 to disable automatic retries and handle manually",
    ],
    ans: [1],
    exp: {
      correct: [
        "Exponential backoff with jitter -- AWS recommends exponential backoff with jitter for throttling errors. Each retry waits progressively longer plus a random jitter, reducing the thundering herd problem. The boto3 SDK has built-in retry logic but developers should add application-level backoff for persistent throttling.",
      ],
      incorrect: [
        "Immediately retry -- retry storms can exacerbate throttling; without backoff, retries hit the table at the same rate and continue to fail.",
        "Switch to on-demand in code -- capacity mode is a table setting changed via the API/console, not something the application SDK call controls. Also doesn't address the immediate error.",
        "Disabling SDK retries -- disabling retries and retrying manually without backoff is the same as immediate retry without the SDK's built-in protection.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is building a serverless application using AWS SAM. They define a Lambda function with an S3 event source. After deploying with 'sam deploy', the Lambda is not triggered by S3 uploads. What is the MOST likely cause?",
    opts: [
      "SAM does not support S3 event sources; CloudFormation must be used directly",
      "The S3 bucket must be in the same AWS account but a different region than the Lambda",
      "The Lambda function is missing a resource-based policy allowing S3 to invoke it",
      "SAM requires the S3 bucket to be created outside of the SAM template",
    ],
    ans: [2],
    exp: {
      correct: [
        "Missing resource-based policy -- S3 triggers invoke Lambda via S3's notification configuration, which requires Lambda to have a resource-based policy (lambda:InvokeFunction) granting s3.amazonaws.com permission. SAM adds this automatically when both resources are defined in the same template; if the bucket is pre-existing or separately managed, the permission may be missing.",
      ],
      incorrect: [
        "SAM doesn't support S3 events -- false; SAM's Events section supports S3 natively with the S3 event type.",
        "Cross-region requirement -- S3 and Lambda must be in the same region for direct S3 event notifications.",
        "Bucket must be external -- SAM can create and configure the S3 bucket in the same template; it's not a requirement to define it externally.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is building a REST API with API Gateway and Lambda. The application requires WebSocket connections for real-time notifications. Which API Gateway type supports this?",
    opts: [
      "REST API with long-polling enabled",
      "HTTP API with Server-Sent Events (SSE) integration",
      "WebSocket API",
      "REST API with a streaming Lambda response",
    ],
    ans: [2],
    exp: {
      correct: [
        "WebSocket API -- API Gateway's WebSocket API maintains persistent, bidirectional connections between the client and server. It supports $connect, $disconnect, and custom route selection for real-time two-way communication.",
      ],
      incorrect: [
        "REST API with long-polling -- REST API does not support persistent WebSocket connections; long-polling is a workaround that still uses HTTP request/response cycles.",
        "HTTP API with SSE -- HTTP APIs don't natively support Server-Sent Events; SSE requires a persistent HTTP stream which API Gateway's request/response model doesn't support.",
        "REST API with streaming Lambda response -- Lambda response streaming is for large payload delivery, not bidirectional real-time communication.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is using Amazon Cognito User Pools to authenticate users in a mobile app. After successful login, the app must call a protected API Gateway endpoint. What does the app need to pass to authorize API calls?",
    opts: [
      "The Cognito user's username and password in the Authorization header",
      "The Cognito ID token or Access token as a Bearer token in the Authorization header, with API Gateway configured to use a Cognito User Pool Authorizer",
      "An IAM SigV4 signed request using temporary credentials from Cognito Identity Pool",
      "A session cookie set by Cognito after login",
    ],
    ans: [1],
    exp: {
      correct: [
        "Cognito User Pool Authorizer with ID/Access token -- API Gateway's Cognito User Pool Authorizer validates JWTs issued by the User Pool. The client passes the token as Bearer {token} in the Authorization header. API Gateway validates the token signature and claims without additional Lambda code.",
      ],
      incorrect: [
        "Username/password in Authorization header -- Basic Auth is not supported by Cognito User Pool Authorizer; credentials should never be re-sent on every request.",
        "SigV4 with Cognito Identity Pool credentials -- this is the IAM authorization pattern (AWS_IAM authorizer), not the Cognito User Pool Authorizer pattern. Both exist but serve different use cases.",
        "Session cookie -- Cognito User Pools issue JWTs, not session cookies (unless using the hosted UI with cookie storage, which is a different flow).",
      ],
    },
  },

  // ─── DOMAIN 2: Security ────────────────────────────────────────────────────
  {
    domain: "Security",
    multi: 1,
    question:
      "A developer needs to retrieve a database password at runtime inside a Lambda function. The password is stored in AWS Secrets Manager. What is the MOST secure approach to avoid unnecessary Secrets Manager API calls on every invocation?",
    opts: [
      "Retrieve the secret in the Lambda handler on every invocation",
      "Cache the secret in a Lambda environment variable after the first retrieval",
      "Retrieve the secret in the Lambda initialization code (outside the handler) and cache it in a module-level variable with TTL-based refresh",
      "Store the secret in SSM Parameter Store SecureString and read it via the Lambda environment",
    ],
    ans: [2],
    exp: {
      correct: [
        "Module-level caching with TTL refresh -- Lambda's execution environment persists between warm invocations. Retrieving the secret once in the initialization code (outside the handler) caches it in memory. Adding a TTL check ensures the cache is periodically refreshed to pick up rotated secrets without calling Secrets Manager on every invocation.",
      ],
      incorrect: [
        "Retrieve every invocation -- causes unnecessary Secrets Manager API calls and latency on every invoke; also incurs per-API-call pricing.",
        "Cache in environment variable -- environment variables are set at deploy time and don't update when secrets are rotated. This defeats automatic rotation.",
        "SSM Parameter Store SecureString via environment -- environment variables are set at deploy time. Reading SSM at deploy time means rotated values require re-deployment.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 1,
    question:
      "A developer's Lambda function must encrypt sensitive data before storing it in S3 and decrypt it on retrieval. The encryption key must be managed and audited by AWS, and the developer must control key usage policies. Which AWS service should be used?",
    opts: [
      "AWS Certificate Manager (ACM)",
      "AWS Key Management Service (KMS) with a Customer Managed Key (CMK)",
      "S3 SSE-S3 (Server-Side Encryption with S3-managed keys)",
      "AWS CloudHSM",
    ],
    ans: [1],
    exp: {
      correct: [
        "KMS with Customer Managed Key (CMK) -- CMKs give the developer full control over key policies, rotation, and usage. All encrypt/decrypt operations are logged in CloudTrail. The developer calls kms:Encrypt/Decrypt directly and can audit every key usage.",
      ],
      incorrect: [
        "ACM -- manages SSL/TLS certificates for services like ALB, CloudFront, and API Gateway; not a general-purpose encryption key service.",
        "S3 SSE-S3 -- AWS manages the keys entirely with no visibility or control for the developer; no CloudTrail logging of individual object decryptions.",
        "AWS CloudHSM -- provides dedicated hardware security modules for stricter compliance requirements; significantly more expensive and complex. KMS CMK is appropriate for most use cases.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 2,
    question:
      "A developer needs to grant a third-party application running in another AWS account access to an S3 bucket. Which TWO methods can be used? (Select TWO.)",
    opts: [
      "Create an IAM user in the bucket owner's account and share the access keys",
      "Create a cross-account IAM role in the bucket owner's account and allow the third-party account to assume it",
      "Attach a bucket policy on the S3 bucket that allows the third-party account's principal",
      "Enable S3 Transfer Acceleration on the bucket",
      "Use AWS Resource Access Manager (RAM) to share the S3 bucket",
    ],
    ans: [1, 2],
    exp: {
      correct: [
        "Cross-account IAM role -- the bucket owner creates a role with S3 permissions and a trust policy allowing the external account to assume it via sts:AssumeRole. No long-term credentials are shared.",
        "S3 bucket policy allowing external account -- a resource-based bucket policy can explicitly allow a specific external account principal (arn:aws:iam::ACCOUNT_ID:root or specific role/user) to access the bucket.",
      ],
      incorrect: [
        "Sharing IAM access keys -- a security anti-pattern. Long-term credentials should never be shared; cross-account roles are the recommended approach.",
        "S3 Transfer Acceleration -- improves upload speed using CloudFront edge locations; does not address cross-account access.",
        "AWS RAM for S3 -- RAM supports sharing of many resource types but S3 buckets are not currently shareable via RAM.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 1,
    question:
      "A Lambda function uses an IAM execution role with an attached policy containing: Effect: Allow, Action: s3:*, Resource: arn:aws:s3:::my-bucket/*. A second policy contains: Effect: Deny, Action: s3:DeleteObject, Resource: *. The function attempts to delete an object from my-bucket. What happens?",
    opts: [
      "The delete succeeds because the Allow policy explicitly grants s3:* on my-bucket",
      "The delete fails because Deny policies always override Allow policies",
      "The delete succeeds because resource-specific Allow policies take priority over wildcard Deny policies",
      "The delete fails because Lambda functions cannot delete S3 objects",
    ],
    ans: [1],
    exp: {
      correct: [
        "Deny overrides Allow -- IAM policy evaluation follows this order: explicit Deny > explicit Allow > implicit Deny. A Deny on s3:DeleteObject for Resource: * will always override any Allow for s3:* regardless of specificity. The delete operation will fail with AccessDenied.",
      ],
      incorrect: [
        "Delete succeeds due to explicit Allow -- this is incorrect. An explicit Deny always takes precedence over any Allow, regardless of which policy is more specific.",
        "Resource-specific Allow takes priority -- IAM does not use policy specificity to resolve conflicts. Any explicit Deny wins.",
        "Lambda cannot delete S3 objects -- Lambda functions can absolutely delete S3 objects; the limitation here is IAM policy evaluation, not a Lambda restriction.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 1,
    question:
      "A web application uses Amazon Cognito User Pools. After authentication, users should be able to call AWS services (e.g., DynamoDB) directly from the client app. What Cognito component enables this?",
    opts: [
      "Cognito User Pool Groups",
      "Cognito Identity Pools (Federated Identities)",
      "Cognito User Pool App Clients",
      "Cognito Lambda Triggers",
    ],
    ans: [1],
    exp: {
      correct: [
        "Cognito Identity Pools -- Identity Pools exchange Cognito User Pool tokens (or other federated identity tokens) for temporary AWS credentials via AWS STS. These credentials allow the client app to call AWS services directly with fine-grained IAM permissions.",
      ],
      incorrect: [
        "Cognito User Pool Groups -- groups map users to IAM roles but the Identity Pool is still required to exchange the token for credentials.",
        "Cognito App Clients -- app clients define how applications interact with the User Pool (auth flows, token expiry); they don't issue AWS credentials.",
        "Cognito Lambda Triggers -- allow custom logic at authentication lifecycle events (pre-signup, post-auth, etc.); they don't issue temporary AWS credentials.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 1,
    question:
      "A developer needs to implement API authorization where different users have access to different API Gateway routes based on custom claims in their JWT. Which API Gateway authorizer type is BEST suited?",
    opts: [
      "Cognito User Pool Authorizer",
      "Lambda Authorizer (TOKEN type)",
      "IAM Authorization (AWS_IAM)",
      "Resource Policy on the API",
    ],
    ans: [1],
    exp: {
      correct: [
        "Lambda Authorizer (TOKEN type) -- a Lambda Authorizer receives the token, can inspect any custom JWT claims, and returns an IAM policy document that allows or denies access to specific API methods and routes. This enables fine-grained, claim-based access control that Cognito Authorizer alone cannot provide.",
      ],
      incorrect: [
        "Cognito User Pool Authorizer -- validates that the JWT is a valid Cognito-issued token and checks standard claims (expiry, audience). It cannot evaluate custom claims to grant/deny specific routes.",
        "IAM Authorization -- requires SigV4-signed requests; doesn't evaluate JWT claims.",
        "Resource Policy -- controls which IP addresses, VPCs, or accounts can access the API; not designed for per-user, per-route JWT claim authorization.",
      ],
    },
  },

  // ─── DOMAIN 3: Deployment ──────────────────────────────────────────────────
  {
    domain: "Deployment",
    multi: 1,
    question:
      "A developer uses AWS CodeDeploy to deploy a Lambda function. They want to shift 10% of traffic to the new version immediately and then 100% after 10 minutes if no alarms fire. Which deployment configuration achieves this?",
    opts: [
      "CodeDeployDefault.LambdaAllAtOnce",
      "CodeDeployDefault.LambdaCanary10Percent10Minutes",
      "CodeDeployDefault.LambdaLinear10PercentEvery1Minute",
      "CodeDeployDefault.LambdaLinear10PercentEvery10Minutes",
    ],
    ans: [1],
    exp: {
      correct: [
        "LambdaCanary10Percent10Minutes -- Canary deployments send a small percentage of traffic (10%) to the new version first, wait a specified interval (10 minutes), and then either shift 100% or roll back based on CloudWatch alarm status. This exactly matches the requirement.",
      ],
      incorrect: [
        "LambdaAllAtOnce -- immediately shifts 100% of traffic to the new version with no canary period.",
        "LambdaLinear10PercentEvery1Minute -- shifts traffic in 10% increments every minute until reaching 100% (takes ~10 minutes total, not 10% then 100%).",
        "LambdaLinear10PercentEvery10Minutes -- shifts 10% every 10 minutes, taking 100 minutes to fully deploy.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 1,
    question:
      "A developer is using AWS Elastic Beanstalk to deploy a web application. An update needs to be deployed with zero downtime and zero capacity reduction. Which deployment policy should be used?",
    opts: ["All at once", "Rolling", "Rolling with additional batch", "Immutable"],
    ans: [2],
    exp: {
      correct: [
        "Rolling with additional batch -- launches a new batch of instances BEFORE taking any existing instances out of service, ensuring full capacity is maintained throughout the deployment. Zero downtime and no capacity reduction.",
      ],
      incorrect: [
        "All at once -- takes all instances out of service simultaneously; causes downtime.",
        "Rolling -- deploys to a subset of instances at a time, reducing capacity during the update.",
        "Immutable -- creates a completely new set of instances (zero downtime and full capacity), but is the slowest and most expensive option. Rolling with additional batch is correct for 'zero downtime, zero capacity reduction' with lower cost.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 1,
    question:
      "A team uses AWS CodePipeline with CodeBuild and CodeDeploy. They want the pipeline to require a manual approval before deploying to production. Where is this configured?",
    opts: [
      "In the CodeBuild buildspec.yml file as a pause step",
      "As an Approval action stage in CodePipeline",
      "In the CodeDeploy deployment group lifecycle hooks",
      "In an IAM policy that blocks the CodeDeploy role until approved",
    ],
    ans: [1],
    exp: {
      correct: [
        "Approval action in CodePipeline -- CodePipeline supports a native Manual Approval action type. When the pipeline reaches the Approval stage, it pauses and sends an SNS notification. A designated approver reviews and approves/rejects via the console, CLI, or API before the pipeline continues.",
      ],
      incorrect: [
        "CodeBuild buildspec.yml pause step -- buildspec.yml defines build phases and commands; there is no pause/approval concept in CodeBuild.",
        "CodeDeploy lifecycle hooks -- hooks (BeforeInstall, AfterInstall, etc.) are for deployment lifecycle scripts, not for human approvals.",
        "IAM policy blocking CodeDeploy -- IAM denies would cause pipeline failures, not controlled pauses for approval.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 2,
    question:
      "A developer wants to use AWS CloudFormation to create a stack that provisions an S3 bucket, a Lambda function, and an API Gateway. Which TWO statements about CloudFormation are TRUE? (Select TWO.)",
    opts: [
      "CloudFormation templates can be written in JSON or YAML",
      "CloudFormation automatically detects and repairs configuration drift without any additional services",
      "The DependsOn attribute can be used to control resource creation order explicitly",
      "CloudFormation Change Sets allow reviewing proposed changes before applying them",
      "CloudFormation supports rolling back only compute resources (EC2, Lambda), not storage resources",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "JSON or YAML format -- CloudFormation templates support both JSON and YAML syntax.",
        "DependsOn attribute -- when CloudFormation cannot automatically determine the creation order, DependsOn explicitly instructs it to wait for a specified resource to be created first.",
      ],
      incorrect: [
        "Automatic drift detection and repair -- CloudFormation can detect drift via Drift Detection but does NOT automatically repair it; a developer must take action.",
        "Change Sets review changes before applying -- this is TRUE (not false), but it was not selected above; noting it here: Change Sets do exist for reviewing proposed changes.",
        "Rollback limited to compute resources -- false; CloudFormation rolls back all resources defined in the stack, including storage resources.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 1,
    question:
      "A developer needs to deploy the same application to Dev, Staging, and Prod environments. Each environment needs different instance types and database endpoints. What is the BEST approach in CloudFormation?",
    opts: [
      "Create three separate templates with hardcoded values per environment",
      "Use CloudFormation Parameters and Mappings with a single template and separate parameter files per environment",
      "Use AWS CDK only, since CloudFormation cannot handle multi-environment deployments",
      "Use CloudFormation Nested Stacks with environment-specific parent stacks that call the same child stack",
    ],
    ans: [1],
    exp: {
      correct: [
        "Parameters + Mappings with per-environment parameter files -- Parameters allow environment-specific values to be passed at deployment time. Mappings can map environment names to specific values. A single template is maintained and deployed multiple times with different parameter files (--parameter-overrides), following DRY principles.",
      ],
      incorrect: [
        "Three separate templates -- leads to template drift as environments diverge; difficult to maintain.",
        "AWS CDK only -- CloudFormation absolutely supports multi-environment deployments; CDK is an abstraction that generates CloudFormation templates.",
        "Nested Stacks -- a valid advanced pattern but adds complexity. Parameters + Mappings is the standard approach for this use case.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 1,
    question:
      "A developer needs to build, test, and package a Lambda function written in Python. The buildspec.yml in CodeBuild must install dependencies and create a deployment package. Which step installs dependencies into the correct directory for Lambda packaging?",
    opts: [
      "pip install -r requirements.txt",
      "pip install -r requirements.txt -t ./package",
      "pip install -r requirements.txt --user",
      "npm install (Lambda Python packages use npm)",
    ],
    ans: [1],
    exp: {
      correct: [
        "pip install -r requirements.txt -t ./package -- the -t (--target) flag installs packages into a specific directory. For Lambda deployment packages, dependencies must be in the same directory (or a /python subdirectory for layers) so they are included when the directory is zipped.",
      ],
      incorrect: [
        "pip install without -t -- installs to the system Python path, not into the deployment package directory. Dependencies won't be included in the Lambda zip.",
        "pip install --user -- installs to the user's local Python path, not the deployment package directory.",
        "npm install for Python -- npm is for Node.js packages; Python uses pip.",
      ],
    },
  },

  // ─── DOMAIN 4: Troubleshooting & Optimization ──────────────────────────────
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "A Lambda function is timing out intermittently under high load. The function connects to an RDS database. What is the MOST likely root cause and the BEST fix?",
    opts: [
      "Lambda's memory is too low; increase memory to 3008 MB",
      "Lambda is creating a new database connection on every invocation; implement connection pooling using RDS Proxy",
      "The Lambda function needs Provisioned Concurrency to avoid cold starts",
      "The RDS database is in a different VPC; move it to the same VPC as Lambda",
    ],
    ans: [1],
    exp: {
      correct: [
        "RDS Proxy for connection pooling -- Lambda can create thousands of concurrent executions, each opening a new database connection. RDS has a maximum connection limit. RDS Proxy pools and reuses connections, preventing connection exhaustion and the associated timeouts. This is the canonical solution for Lambda + RDS at scale.",
      ],
      incorrect: [
        "Increasing memory -- more memory gives more CPU but doesn't fix database connection exhaustion timeouts.",
        "Provisioned Concurrency -- reduces cold start latency but each warm instance still opens its own DB connection, which doesn't solve connection limit exhaustion.",
        "Same VPC requirement -- Lambda can connect to RDS in the same VPC and must be in the same VPC for private RDS endpoints. But this is likely already configured; VPC difference would cause consistent failures, not intermittent timeouts under load.",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "A developer's Lambda function is logging data to CloudWatch Logs but cannot see the logs in the console. What is the MOST likely cause?",
    opts: [
      "CloudWatch Logs is a paid service and must be explicitly enabled",
      "The Lambda execution role is missing logs:CreateLogGroup, logs:CreateLogStream, and logs:PutLogEvents permissions",
      "Lambda only logs to CloudWatch in the us-east-1 region",
      "The Lambda function must be running inside a VPC to write to CloudWatch Logs",
    ],
    ans: [1],
    exp: {
      correct: [
        "Missing CloudWatch Logs permissions on the execution role -- Lambda writes to CloudWatch Logs using the execution role's permissions. Without logs:CreateLogGroup, logs:CreateLogStream, and logs:PutLogEvents, the function cannot create or write to log streams. The function silently drops logs.",
      ],
      incorrect: [
        "CloudWatch Logs is paid -- while CloudWatch Logs has pricing, it is not 'disabled by default'; missing IAM permissions is the common cause of missing logs.",
        "Only logs in us-east-1 -- Lambda writes to CloudWatch Logs in its own region; it's not region-restricted to us-east-1.",
        "VPC requirement for logging -- Lambda inside a VPC needs a NAT Gateway or VPC endpoint to reach CloudWatch Logs endpoints, but logging works without a VPC by default.",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 2,
    question:
      "A developer notices their Lambda function has high cold start latency. The function uses Java and loads a large Spring Boot framework. Which TWO options MOST effectively reduce cold start time? (Select TWO.)",
    opts: [
      "Enable Provisioned Concurrency for the Lambda function",
      "Use AWS Lambda SnapStart for Java functions",
      "Increase the Lambda timeout from 3 seconds to 30 seconds",
      "Switch the Lambda runtime from Java 17 to Python 3.12",
      "Reduce the function's memory allocation to minimum (128 MB)",
    ],
    ans: [0, 1],
    exp: {
      correct: [
        "Provisioned Concurrency -- pre-initializes Lambda execution environments, eliminating cold starts entirely for pre-warmed instances. Requests that hit these environments have no cold start penalty.",
        "Lambda SnapStart for Java -- SnapStart takes a snapshot of the initialized execution environment after the init phase, restoring it on subsequent invocations. Dramatically reduces Java cold starts (often by 90%+) without architectural changes.",
      ],
      incorrect: [
        "Increasing Lambda timeout -- the timeout setting only determines when Lambda kills a running invocation; it doesn't affect how long initialization takes.",
        "Switching to Python 3.12 -- Python has faster cold starts but is not always a viable option (language change). SnapStart and Provisioned Concurrency are Java-specific optimizations that don't require a language change.",
        "Reducing memory to 128 MB -- less memory means less CPU, which makes the init phase slower. Increasing memory generally reduces cold start time.",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "A developer uses X-Ray to trace a distributed application. The traces show a high latency segment labeled 'Initialization' in Lambda. What does this indicate?",
    opts: [
      "The Lambda function is downloading its code package from S3 on every invocation",
      "The Lambda function is experiencing cold starts; the initialization segment represents the execution environment setup",
      "The Lambda function has a syntax error in the handler causing delayed startup",
      "The Lambda function's VPC configuration is causing delayed network interface provisioning",
    ],
    ans: [1],
    exp: {
      correct: [
        "Cold start / Initialization segment -- X-Ray captures an 'Initialization' subsegment specifically for Lambda cold starts, which includes downloading the deployment package, starting the runtime, and running initialization code (outside the handler). High initialization latency indicates frequent cold starts.",
      ],
      incorrect: [
        "Downloading code from S3 -- code download is part of the cold start process included in the Initialization segment, but the segment represents the entire init phase, not just S3 download.",
        "Syntax error -- a syntax error causes an immediate runtime error (ImportModuleError or similar), not high initialization latency.",
        "VPC network interface provisioning -- historically a cause of cold start delays, but AWS improved this significantly. VPC cold starts are now minimal and part of the Initialization segment.",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "A developer wants to trace API calls to DynamoDB within their Lambda function using AWS X-Ray. What must the developer do in their Python code?",
    opts: [
      "Import boto3 and enable X-Ray tracing in the Lambda console; no code changes needed",
      "Wrap the boto3 client with the aws_xray_sdk's patch_all() or patch(['boto3']) call",
      "Add an X-Ray daemon process to the Lambda deployment package",
      "Enable DynamoDB Streams; X-Ray automatically traces all DynamoDB API calls",
    ],
    ans: [1],
    exp: {
      correct: [
        "aws_xray_sdk patch_all() or patch(['boto3']) -- the AWS X-Ray SDK for Python must patch boto3 to automatically create subsegments for AWS SDK calls. Without patching, X-Ray only traces the Lambda invocation itself, not downstream DynamoDB calls.",
      ],
      incorrect: [
        "No code changes with Lambda console tracing -- enabling Active Tracing on the Lambda function traces the invocation but does NOT automatically trace downstream AWS SDK calls; the SDK must be patched.",
        "X-Ray daemon in deployment package -- Lambda already runs an X-Ray daemon sidecar; developers don't need to package or manage it.",
        "DynamoDB Streams for X-Ray -- Streams are for capturing data changes; they don't relate to X-Ray request tracing.",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "An SQS-triggered Lambda function is failing to process messages. Failing messages appear repeatedly in the queue. What is the BEST approach to isolate these poison pill messages without losing them?",
    opts: [
      "Increase the Lambda function timeout so it has more time to process difficult messages",
      "Configure a Dead Letter Queue (DLQ) on the SQS queue and set an appropriate maxReceiveCount on the redrive policy",
      "Delete the SQS queue and recreate it with a longer message retention period",
      "Add a try/catch in the Lambda function that catches all exceptions and returns success",
    ],
    ans: [1],
    exp: {
      correct: [
        "SQS DLQ with redrive policy -- configuring a DLQ and setting maxReceiveCount on the source queue's redrive policy ensures that messages which fail processing more than maxReceiveCount times are automatically moved to the DLQ. Messages are preserved for investigation without blocking the main queue.",
      ],
      incorrect: [
        "Increasing Lambda timeout -- helps with slow processing but doesn't handle consistently failing (poison pill) messages which will continue to fail regardless of timeout.",
        "Delete and recreate queue -- loses all messages currently in the queue; not a solution for poison pills.",
        "Catch all exceptions and return success -- silently swallows errors, making messages disappear from the queue without being processed. Data is lost and errors are hidden.",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "A developer notices that a DynamoDB table has one partition receiving a disproportionate amount of reads and writes (a 'hot partition'). What is the BEST design change to resolve this?",
    opts: [
      "Enable DynamoDB Auto Scaling to increase capacity automatically",
      "Add a random suffix or prefix to the partition key to distribute load across multiple partitions",
      "Increase the provisioned read and write capacity units on the table",
      "Enable DynamoDB global tables to distribute the load across regions",
    ],
    ans: [1],
    exp: {
      correct: [
        "Partition key sharding (adding suffix/prefix) -- a hot partition results from a poorly chosen partition key with skewed access patterns. Adding a random 1-N suffix creates N logical partitions and distributes reads/writes. The application reads from all shards and aggregates results.",
      ],
      incorrect: [
        "Auto Scaling -- adjusts capacity reactively but does not resolve uneven distribution across partitions. A hot partition can still be throttled even with high overall capacity.",
        "Increasing provisioned capacity -- same limitation as Auto Scaling; the hot partition is still limited by its per-partition throughput ceiling, not the overall table capacity.",
        "Global tables -- replicate data across regions for multi-region availability and local reads/writes; they don't resolve single-table hot partition issues.",
      ],
    },
  },

  // ─── DOMAIN 5: Messaging & Integration ────────────────────────────────────
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A developer is designing an order processing system. An order must trigger both an inventory update service and an email notification service simultaneously. Both services process independently. What is the BEST architecture?",
    opts: [
      "Use SQS FIFO queue and have both services poll the same queue",
      "Use SNS topic with two SQS queue subscriptions, one per downstream service",
      "Use EventBridge with a single Lambda that calls both services sequentially",
      "Use SQS Standard queue and implement duplicate message handling in both services",
    ],
    ans: [1],
    exp: {
      correct: [
        "SNS with SQS fan-out -- publishing to an SNS topic delivers the message to all subscribed SQS queues simultaneously. Each downstream service has its own queue and processes independently at its own pace. This is the classic pub/sub fan-out pattern for decoupled, parallel processing.",
      ],
      incorrect: [
        "Single SQS FIFO queue shared by both services -- only one consumer reads each message; both services cannot independently receive the same order message.",
        "Single Lambda calling both services sequentially -- couples the services (both must succeed), adds latency, and makes the architecture brittle.",
        "SQS Standard with duplicate handling -- a single queue still only delivers each message to one consumer; duplicate handling addresses the at-least-once delivery guarantee, not fan-out to multiple services.",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A developer uses SQS to decouple a web frontend from a processing backend. The messages contain sensitive financial data. The developer must ensure messages are encrypted at rest. What is the CORRECT approach?",
    opts: [
      "Encode message bodies in Base64 before sending",
      "Enable Server-Side Encryption (SSE) on the SQS queue using AWS KMS",
      "Use HTTPS endpoints for SQS API calls only",
      "SQS automatically encrypts all messages; no configuration is needed",
    ],
    ans: [1],
    exp: {
      correct: [
        "SQS SSE with KMS -- enabling SSE on the SQS queue configures SQS to encrypt messages at rest using a KMS key. Messages are encrypted when stored and decrypted when retrieved by the consumer.",
      ],
      incorrect: [
        "Base64 encoding -- encoding is not encryption; data is trivially reversible and provides no security.",
        "HTTPS only -- HTTPS encrypts data in transit but not at rest within the SQS service.",
        "SQS auto-encrypts -- SQS does NOT encrypt data at rest by default; SSE must be explicitly enabled.",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A developer needs to guarantee that messages in an SQS queue are processed in the EXACT order they were sent, and that duplicate messages are never processed. Which queue type and feature should be used?",
    opts: [
      "SQS Standard queue with message deduplication in the consumer",
      "SQS FIFO queue with content-based deduplication enabled",
      "SQS Standard queue with a DLQ for duplicate detection",
      "Kinesis Data Streams with enhanced fan-out",
    ],
    ans: [1],
    exp: {
      correct: [
        "SQS FIFO queue with content-based deduplication -- FIFO queues guarantee exactly-once processing and strict message ordering within a message group. Content-based deduplication uses a hash of the message body to detect and reject duplicate messages sent within the 5-minute deduplication window.",
      ],
      incorrect: [
        "SQS Standard with consumer deduplication -- Standard queues provide best-effort ordering (not strict) and at-least-once delivery. Consumer-side deduplication is complex and still doesn't guarantee processing order.",
        "SQS Standard with DLQ -- a DLQ captures failed messages; it doesn't detect or prevent duplicates.",
        "Kinesis Data Streams -- provides ordering within a shard and at-least-once delivery, but not exactly-once; more appropriate for high-throughput streaming analytics.",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 2,
    question:
      "A developer needs to build an event-driven pipeline where an S3 upload triggers a Lambda to process the file. The Lambda occasionally fails. Failed events must be retried automatically and eventually written to a DLQ after 2 failed attempts. Which TWO configurations enable this? (Select TWO.)",
    opts: [
      "Configure an S3 event notification directly to Lambda with Lambda's async invocation DLQ set to an SQS queue",
      "Configure EventBridge to receive S3 event notifications, then route to Lambda with retry and DLQ settings",
      "Configure S3 to write to an SQS queue, then have Lambda poll SQS with a maxReceiveCount redrive policy of 2",
      "Configure Lambda's Destinations feature to send failures to an SNS topic",
      "Configure an S3 Replication rule to retry failed Lambda invocations",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "S3 → Lambda async with Lambda DLQ -- S3 event notifications invoke Lambda asynchronously. Lambda's asynchronous invocation retries twice by default. Configuring a DLQ (SQS or SNS) on the Lambda function captures events that exhaust retries.",
        "S3 → SQS → Lambda with redrive policy -- S3 can publish events to an SQS queue. Lambda polls SQS (event source mapping). Setting maxReceiveCount=2 in the SQS redrive policy ensures messages that fail twice are moved to a DLQ SQS queue.",
      ],
      incorrect: [
        "EventBridge S3 notifications -- valid pattern but EventBridge requires explicit S3 event routing via EventBridge notification configuration, which is a different setup. Less common for this basic pattern.",
        "Lambda Destinations for failures -- Lambda Destinations can route async invocation failures to SQS/SNS/Lambda/EventBridge, but this is separate from the DLQ configuration. Both can work but DLQ is the traditional approach.",
        "S3 Replication for retries -- S3 Replication copies objects between buckets; it has no mechanism to retry Lambda invocations.",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A developer is using Amazon Kinesis Data Streams to process clickstream events. The consumer Lambda function is falling behind the producers. Which feature should the developer enable to scale consumer throughput without managing multiple consumer applications?",
    opts: [
      "Increase the number of shards in the Kinesis stream",
      "Enable Enhanced Fan-Out for the Lambda consumer",
      "Use SQS instead of Kinesis for the clickstream data",
      "Enable Kinesis Data Firehose to buffer records before Lambda processes them",
    ],
    ans: [1],
    exp: {
      correct: [
        "Enhanced Fan-Out -- provides a dedicated 2 MB/sec/shard throughput per registered consumer using HTTP/2 push. Without Enhanced Fan-Out, all consumers share the 2 MB/sec/shard read throughput. Enhanced Fan-Out eliminates read throttling and reduces processing latency for multiple consumers.",
      ],
      incorrect: [
        "Increasing shards -- increases total throughput capacity but also requires the consumer to process more shards; more complex to manage and increases cost.",
        "SQS instead of Kinesis -- SQS is for queuing, not time-ordered stream processing with replay. Switching is an architectural change, not a scaling solution.",
        "Kinesis Firehose -- a delivery service to destinations like S3, Redshift, etc.; not designed to buffer records before Lambda processing in this context.",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A developer is building a Step Functions state machine for an order fulfillment workflow with 8 steps. Some steps call external APIs that can take up to 24 hours to respond (callback pattern). Which integration pattern should be used for these long-running external steps?",
    opts: [
      "Express Workflow with Lambda invocation",
      "Standard Workflow with .waitForTaskToken integration pattern",
      "Standard Workflow with synchronous Lambda invocation",
      "Express Workflow with .waitForTaskToken integration pattern",
    ],
    ans: [1],
    exp: {
      correct: [
        "Standard Workflow with .waitForTaskToken -- Standard Workflows support durations up to 1 year. The .waitForTaskToken pattern pauses the state machine step indefinitely until an external system calls SendTaskSuccess/SendTaskFailure with the task token. Express Workflows max out at 5 minutes, too short for 24-hour callbacks.",
      ],
      incorrect: [
        "Express Workflow with Lambda -- Express Workflows max at 5 minutes total duration; cannot wait 24 hours.",
        "Standard Workflow with synchronous Lambda -- a synchronous Lambda invocation blocks and will timeout at the Lambda's max 15-minute limit, not 24 hours.",
        "Express Workflow with waitForTaskToken -- still limited to 5-minute maximum duration; unsuitable for 24-hour waits.",
      ],
    },
  },

  // ─── DOMAIN 6: Storage & Databases ────────────────────────────────────────
  {
    domain: "Storage & Databases",
    multi: 1,
    question:
      "A developer needs to allow a web browser to upload files directly to an S3 bucket from a different domain. The browser receives a CORS error. What must be configured?",
    opts: [
      "Enable Transfer Acceleration on the S3 bucket",
      "Set the S3 bucket ACL to public-read",
      "Add a CORS configuration to the S3 bucket allowing the origin domain's methods and headers",
      "Configure an IAM policy allowing the browser's IP address",
    ],
    ans: [2],
    exp: {
      correct: [
        "S3 CORS configuration -- S3 supports CORS configuration where you define allowed origins, methods (GET, PUT, POST, DELETE), and headers. The browser's preflight OPTIONS request is responded to with the correct CORS headers, allowing the cross-origin upload.",
      ],
      incorrect: [
        "Transfer Acceleration -- improves upload speed via CloudFront edge locations; does not resolve CORS errors.",
        "Public-read ACL -- makes objects publicly readable but doesn't configure CORS headers; the browser will still receive CORS errors.",
        "IAM policy for IP address -- IAM doesn't handle CORS; CORS is an HTTP header mechanism, not an IAM authorization issue.",
      ],
    },
  },
  {
    domain: "Storage & Databases",
    multi: 1,
    question:
      "A developer needs to generate a pre-signed URL to allow an unauthenticated user to download a private S3 object for 1 hour. Which SDK call creates this?",
    opts: [
      "s3.get_object() with an Expires header",
      "s3.generate_presigned_url('get_object', Params={'Bucket': bucket, 'Key': key}, ExpiresIn=3600)",
      "s3.put_bucket_acl() with public-read on the specific object",
      "cloudfront.create_signed_url() with a 1-hour expiry",
    ],
    ans: [1],
    exp: {
      correct: [
        "generate_presigned_url -- this boto3 method generates a time-limited URL that includes the caller's credentials embedded as query parameters. Anyone with the URL can download the object until it expires (3600 seconds = 1 hour), without needing AWS credentials.",
      ],
      incorrect: [
        "s3.get_object() with Expires header -- get_object retrieves the object immediately; Expires is a metadata header, not an expiry on the URL.",
        "s3.put_bucket_acl() public-read on object -- makes the object permanently public; does not create a time-limited URL.",
        "CloudFront signed URL -- valid for CloudFront distributions but requires a CloudFront key pair and distribution setup; overkill for S3 direct access.",
      ],
    },
  },
  {
    domain: "Storage & Databases",
    multi: 2,
    question:
      "A developer is designing a DynamoDB table for an e-commerce app. The most common queries are: (1) Get all orders for a customer sorted by date, (2) Get a single order by orderId. Which TWO table design choices support BOTH access patterns efficiently? (Select TWO.)",
    opts: [
      "Partition key: customerId, Sort key: orderDate",
      "Partition key: orderId (no sort key) as a separate table",
      "Partition key: customerId, Sort key: orderDate on the base table; a GSI with partition key: orderId",
      "Enable DynamoDB Streams and build a Lambda to maintain a sorted index",
      "Use a relational database instead since DynamoDB cannot support multiple access patterns",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "PK: customerId, SK: orderDate -- this base table design supports query (1) directly: Query on PK=customerId with ScanIndexForward=false to get orders sorted by date descending.",
        "Base table PK:customerId SK:orderDate + GSI PK:orderId -- adding a GSI with orderId as the partition key allows GetItem or Query on the GSI for query (2): retrieve a single order by orderId. This is the single-table design pattern.",
      ],
      incorrect: [
        "Separate orderId table -- requires two separate tables and separate code paths; doesn't support query (1) efficiently.",
        "DynamoDB Streams + Lambda -- overly complex for a simple access pattern; DynamoDB's native secondary indexes handle this natively.",
        "Use relational database -- DynamoDB is well-suited for multiple access patterns via GSIs; switching databases is unnecessary.",
      ],
    },
  },
  {
    domain: "Storage & Databases",
    multi: 1,
    question:
      "A developer is using S3 versioning. A user accidentally deleted an important object. How can the object be recovered?",
    opts: [
      "Restore from an S3 Glacier archive automatically created during deletion",
      "Delete the delete marker that was created when the object was deleted; the previous version becomes current",
      "Contact AWS Support to recover the object from S3 internal backups",
      "Use S3 Cross-Region Replication to retrieve the object from the replica bucket",
    ],
    ans: [1],
    exp: {
      correct: [
        "Delete the delete marker -- in a versioned bucket, deleting an object without specifying a version ID creates a delete marker. The previous versions are preserved. Deleting the delete marker (by specifying its version ID) restores visibility of the most recent previous version.",
      ],
      incorrect: [
        "S3 Glacier archive -- S3 versioning doesn't automatically archive to Glacier on deletion; that requires lifecycle rules.",
        "AWS Support recovery -- S3 versioning preserves deleted objects automatically; no need to contact support.",
        "Cross-Region Replication retrieval -- if the deletion was replicated to the replica, the delete marker would exist there too. Versioning recovery is done on the same bucket.",
      ],
    },
  },
  {
    domain: "Storage & Databases",
    multi: 1,
    question:
      "A developer needs to run a DynamoDB query that retrieves all items where a non-key attribute 'status' equals 'PENDING'. The table has 10 million items. What is the MOST efficient approach?",
    opts: [
      "Use a DynamoDB Scan with a FilterExpression on status='PENDING'",
      "Create a Global Secondary Index (GSI) with 'status' as the partition key and query the GSI",
      "Use DynamoDB Streams to extract PENDING items into a separate table",
      "Use Amazon Athena to query the DynamoDB table directly",
    ],
    ans: [1],
    exp: {
      correct: [
        "GSI with status as partition key -- a GSI allows querying non-key attributes efficiently. With 'status' as the GSI partition key, a Query on GSI with KeyConditionExpression='status = :pending' reads only matching items, consuming minimal read capacity.",
      ],
      incorrect: [
        "Scan with FilterExpression -- a Scan reads every item in the table (10 million items), consuming massive read capacity. FilterExpression is applied after reading all data, not before. Extremely expensive and slow.",
        "DynamoDB Streams -- Streams capture change events for stream processing; they don't help with ad-hoc query patterns.",
        "Amazon Athena -- Athena queries data in S3, not directly in DynamoDB. You'd need to export data first.",
      ],
    },
  },

  // ─── DOMAIN 7: Monitoring & Observability ─────────────────────────────────
  {
    domain: "Monitoring & Observability",
    multi: 1,
    question:
      "A developer wants to receive an alert when the number of Lambda errors exceeds 10 in a 5-minute period. Which combination of services achieves this?",
    opts: [
      "CloudWatch Logs Insights query + SNS notification",
      "CloudWatch Metric Alarm on the Lambda Errors metric + SNS topic as the alarm action",
      "AWS X-Ray trace groups + CloudWatch Events rule",
      "CloudTrail event rule + Lambda function to send the alert",
    ],
    ans: [1],
    exp: {
      correct: [
        "CloudWatch Metric Alarm + SNS -- Lambda automatically publishes an Errors metric to CloudWatch. Creating a Metric Alarm with threshold > 10 over a 5-minute period and setting an SNS topic as the alarm action sends notifications (email, SMS, Lambda) when the threshold is breached.",
      ],
      incorrect: [
        "CloudWatch Logs Insights + SNS -- Logs Insights is an interactive query tool, not a real-time alerting mechanism.",
        "X-Ray trace groups + CloudWatch Events -- X-Ray trace groups filter traces for analysis; they don't emit metric alarms on error counts.",
        "CloudTrail + Lambda -- CloudTrail records API calls (control plane), not Lambda invocation errors (data plane metrics).",
      ],
    },
  },
  {
    domain: "Monitoring & Observability",
    multi: 1,
    question:
      "A developer wants to search Lambda function logs for all lines containing 'ERROR' across a 24-hour period and see the count per hour. Which service and feature provides this capability?",
    opts: [
      "CloudWatch Metrics with a filter dimension for ERROR",
      "CloudWatch Logs Insights with a query using filter and stats commands",
      "AWS X-Ray timeline view filtered by error segments",
      "CloudTrail Data Event search for Lambda errors",
    ],
    ans: [1],
    exp: {
      correct: [
        "CloudWatch Logs Insights -- provides an interactive query language for searching and analyzing log data. A query like: filter @message like /ERROR/ | stats count(*) as errorCount by bin(1h) will return error counts per hour across the selected time range.",
      ],
      incorrect: [
        "CloudWatch Metrics filter dimension -- CloudWatch Metrics don't support text search within log messages; they aggregate numeric values.",
        "X-Ray timeline filtered by errors -- X-Ray shows service maps and traces; it's not a log search tool.",
        "CloudTrail Data Events for Lambda errors -- CloudTrail records API invocations (Invoke calls) but not the error messages inside Lambda execution logs.",
      ],
    },
  },
  {
    domain: "Monitoring & Observability",
    multi: 2,
    question:
      "A developer needs to monitor a serverless application end-to-end, correlating logs from multiple Lambda functions across a single user request. Which TWO AWS services/features should be used together? (Select TWO.)",
    opts: [
      "AWS X-Ray for distributed tracing with trace IDs propagated across function calls",
      "CloudWatch Container Insights for Lambda function correlation",
      "CloudWatch Logs with structured logging (JSON) including a correlation ID in each log entry",
      "AWS Config Rules to detect configuration changes between Lambda deployments",
      "CloudTrail Lake to correlate Lambda API invocations",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "AWS X-Ray distributed tracing -- X-Ray propagates trace IDs across Lambda invocations (when Active Tracing is enabled and the SDK is used). The Service Map shows the full call graph; traces show timing and errors across all functions in a single request.",
        "Structured logging with correlation ID -- embedding a consistent correlation ID (e.g., request ID or X-Ray trace ID) in structured JSON logs across all functions allows CloudWatch Logs Insights queries to retrieve all log entries for a single user request.",
      ],
      incorrect: [
        "CloudWatch Container Insights -- designed for containerized applications (ECS, EKS), not Lambda.",
        "AWS Config Rules -- detect resource configuration compliance drift; not for request-level log correlation.",
        "CloudTrail Lake -- aggregates and queries CloudTrail API events; useful for audit but not for correlating application-level request flows.",
      ],
    },
  },

  // ─── DOMAIN 8: CI/CD & Developer Tools ────────────────────────────────────
  {
    domain: "CI/CD & Developer Tools",
    multi: 1,
    question:
      "A developer commits code to a CodeCommit repository. The team wants CodeBuild to automatically start a build on every push to the main branch. How is this configured?",
    opts: [
      "CodeBuild polls the CodeCommit repository every minute for changes",
      "Configure an Amazon EventBridge rule that matches CodeCommit repository state change events on the main branch and targets the CodeBuild project",
      "Enable CodeBuild source webhooks pointing to the CodeCommit repository",
      "Add a post-commit hook in CodeCommit that calls the CodeBuild API",
    ],
    ans: [1],
    exp: {
      correct: [
        "EventBridge rule on CodeCommit events -- CodeCommit emits events to EventBridge when branches are updated. An EventBridge rule matching referenceUpdated events on the main branch can target CodeBuild's StartBuild API, triggering an automatic build on every push.",
      ],
      incorrect: [
        "CodeBuild polling -- CodeBuild does not poll for changes; it must be triggered.",
        "CodeBuild source webhooks -- webhooks are supported for GitHub and Bitbucket sources; CodeCommit uses EventBridge, not webhooks.",
        "Post-commit hook in CodeCommit -- CodeCommit doesn't support server-side git hooks (like post-commit or post-receive).",
      ],
    },
  },
  {
    domain: "CI/CD & Developer Tools",
    multi: 1,
    question:
      "A developer's CodeBuild project needs to access a private RDS database during integration tests. The RDS database is inside a VPC. What must be configured?",
    opts: [
      "Make the RDS database publicly accessible and add a security group rule for CodeBuild's IP range",
      "Configure the CodeBuild project to run inside the same VPC, subnet, and security group with access to the RDS database",
      "Use VPC peering to connect CodeBuild's default VPC to the RDS VPC",
      "Deploy a NAT Gateway in the RDS VPC to allow CodeBuild internet access to RDS",
    ],
    ans: [1],
    exp: {
      correct: [
        "CodeBuild VPC configuration -- CodeBuild supports running builds inside a specified VPC, subnet, and security group. By placing CodeBuild in the same VPC (or a peered VPC) as RDS and adding the CodeBuild security group to the RDS security group's inbound rules, the build can access RDS privately.",
      ],
      incorrect: [
        "Public RDS -- a security anti-pattern; RDS should remain private. CodeBuild IPs are not static so IP-range rules are impractical.",
        "VPC Peering -- a valid approach if the VPCs are different, but the simplest solution is to configure CodeBuild to run inside the RDS VPC directly.",
        "NAT Gateway -- NAT Gateways provide outbound internet access from private subnets; they don't help with private VPC-to-VPC database connectivity.",
      ],
    },
  },
  {
    domain: "CI/CD & Developer Tools",
    multi: 1,
    question:
      "A team has a CodePipeline that deploys to production. The pipeline sometimes fails at the CodeDeploy stage. A developer wants to automatically roll back the deployment to the previous version if the deployment fails. How is this configured?",
    opts: [
      "In CodePipeline, add a rollback stage after the deploy stage",
      "In the CodeDeploy deployment group, enable automatic rollback on deployment failure",
      "In CodeBuild, add a rollback script that is executed on failure",
      "In CloudFormation, enable stack rollback on the deployment resource",
    ],
    ans: [1],
    exp: {
      correct: [
        "CodeDeploy automatic rollback on deployment failure -- CodeDeploy deployment groups support automatic rollback triggers. When enabled with 'Roll back when a deployment fails', CodeDeploy automatically redeploys the last successful revision if the deployment fails or alarms are triggered.",
      ],
      incorrect: [
        "CodePipeline rollback stage -- CodePipeline doesn't have a native rollback stage type; rollback is managed at the CodeDeploy level.",
        "CodeBuild rollback script -- CodeBuild runs the build phase; it can't roll back a CodeDeploy deployment that hasn't started yet.",
        "CloudFormation stack rollback -- applicable for CloudFormation-managed resources but CodeDeploy is the deployment service here; its own rollback mechanism is appropriate.",
      ],
    },
  },
  {
    domain: "CI/CD & Developer Tools",
    multi: 1,
    question:
      "A developer is writing a buildspec.yml for a CodeBuild project. The build produces a JAR file that must be uploaded to S3 and made available to the next stage in CodePipeline. Where is the output artifact location defined in the buildspec?",
    opts: [
      "In the environment section with the ARTIFACT_PATH variable",
      "In the artifacts section with the files key listing the JAR file",
      "In the phases/post_build commands by calling aws s3 cp manually",
      "In a separate CodePipeline artifact configuration; buildspec.yml doesn't control artifacts",
    ],
    ans: [1],
    exp: {
      correct: [
        "artifacts section with files key -- the buildspec.yml artifacts section defines which files CodeBuild packages and uploads to the output artifact location (S3). CodePipeline retrieves this artifact and passes it to subsequent stages. Example: artifacts: files: - 'target/*.jar'.",
      ],
      incorrect: [
        "Environment variable ARTIFACT_PATH -- there is no such standard environment variable; artifacts are declared in the artifacts section.",
        "aws s3 cp in post_build -- while you can manually copy files in post_build, this bypasses CodeBuild's artifact mechanism and the artifact won't be available to CodePipeline as a structured artifact.",
        "CodePipeline configuration only -- CodePipeline specifies the artifact S3 location and name, but the files to include are defined in buildspec.yml's artifacts section.",
      ],
    },
  },

  // ─── DOMAIN 9: Additional DVA-C02 Scenarios ────────────────────────────────
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer needs to run a Lambda function inside a VPC but also needs to call the DynamoDB API. Outbound internet access is not available from the VPC. What must be provisioned?",
    opts: [
      "A NAT Gateway in the VPC",
      "A VPC Endpoint for DynamoDB (Gateway endpoint)",
      "An Internet Gateway attached to the VPC",
      "AWS PrivateLink for DynamoDB Interface endpoint",
    ],
    ans: [1],
    exp: {
      correct: [
        "VPC Gateway Endpoint for DynamoDB -- DynamoDB and S3 support Gateway VPC Endpoints, which route traffic from the VPC to the AWS service through the AWS network without requiring internet access. Free of charge and require only a route table update.",
      ],
      incorrect: [
        "NAT Gateway -- provides outbound internet access; adds cost per GB. Unnecessary if a VPC Endpoint is available.",
        "Internet Gateway -- routes traffic to the public internet; Lambda in a private subnet cannot use an IGW without a NAT Gateway, and this would route DynamoDB traffic over the internet unnecessarily.",
        "PrivateLink Interface Endpoint -- DynamoDB uses a Gateway endpoint type, not an Interface endpoint (PrivateLink). Using the wrong endpoint type won't work.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 1,
    question:
      "A developer stores application configuration in AWS Systems Manager Parameter Store. Some parameters contain database passwords. What parameter type should be used and which AWS service should encrypt them?",
    opts: [
      "String parameter type; encrypted manually by the developer before storing",
      "SecureString parameter type; encrypted automatically using AWS KMS",
      "StringList parameter type; encrypted at the S3 layer",
      "String parameter type; AWS SSM encrypts all parameter types automatically",
    ],
    ans: [1],
    exp: {
      correct: [
        "SecureString with KMS -- Parameter Store's SecureString type automatically encrypts the parameter value using a KMS key (default SSM key or a specified CMK). The value is encrypted at rest and decrypted when retrieved by authorized callers.",
      ],
      incorrect: [
        "String with manual encryption -- unnecessary complexity; SecureString provides automatic encryption without developer-managed encryption logic.",
        "StringList with S3 encryption -- StringList is for comma-separated plain text values; not encrypted. S3 encryption applies to S3 objects, not SSM parameters.",
        "String auto-encrypted -- String and StringList parameter types are stored in plain text; only SecureString is encrypted.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 1,
    question: "A developer is using the AWS CDK to define infrastructure. After running 'cdk synth', what is produced?",
    opts: [
      "A deployed CloudFormation stack in the AWS account",
      "A CloudFormation template (YAML or JSON) representing the infrastructure",
      "An executable binary that provisions resources directly via the AWS SDK",
      "A SAM template that can be deployed with 'sam deploy'",
    ],
    ans: [1],
    exp: {
      correct: [
        "'cdk synth' produces a CloudFormation template -- the CDK synthesizes your CDK app code into one or more CloudFormation templates stored in the cdk.out directory. These templates are used by 'cdk deploy' to provision the actual infrastructure.",
      ],
      incorrect: [
        "Deployed CloudFormation stack -- 'cdk deploy' deploys; 'cdk synth' only synthesizes templates without deploying.",
        "Executable binary -- CDK generates CloudFormation templates, not executable binaries.",
        "SAM template -- CDK generates standard CloudFormation; it does not produce SAM templates (though AWS SAM CLI can deploy CDK apps).",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A Lambda function is triggered by an SQS queue. The function processes 5 messages per batch and occasionally fails on individual messages within a batch. The developer wants failed messages to go to a DLQ without losing successfully processed messages. What feature enables this?",
    opts: [
      "Configure the Lambda function to delete each message manually after processing",
      "Enable SQS partial batch response by returning a batchItemFailures list in the Lambda response",
      "Set the SQS visibility timeout to 0 so failed messages are immediately retried",
      "Use a FIFO queue so that failed messages don't block the rest of the batch",
    ],
    ans: [1],
    exp: {
      correct: [
        "Partial batch response with batchItemFailures -- Lambda's SQS event source mapping supports partial batch responses. By returning a JSON body with batchItemFailures listing the messageIds of failed messages, Lambda re-queues only those specific messages. Successfully processed messages are deleted from the queue, preventing unnecessary reprocessing.",
      ],
      incorrect: [
        "Manual message deletion -- developers don't normally manually delete SQS messages from Lambda; the event source mapping handles deletion after successful processing. Manual deletion adds complexity.",
        "Visibility timeout of 0 -- a visibility timeout of 0 makes messages immediately visible to other consumers, causing race conditions and duplicate processing.",
        "FIFO queue -- FIFO queues process message groups in order and stop processing a group when a message fails. This is actually more restrictive, not less.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 2,
    question:
      "A developer is building a serverless API. Some Lambda functions need to share common utility code (logging, validation helpers). The utility code is 50 MB. Which TWO options enable code sharing across Lambda functions? (Select TWO.)",
    opts: [
      "Include the utility code in each Lambda function's deployment package",
      "Create a Lambda Layer containing the utility code and attach it to each function",
      "Store the utility code in S3 and download it in each function's handler on every invocation",
      "Create a shared Lambda function and invoke it synchronously from other functions",
      "Use container images and include the utility code in a base image",
    ],
    ans: [1, 4],
    exp: {
      correct: [
        "Lambda Layers -- a Layer packages dependencies/utilities as a .zip file published to Lambda. Functions reference the layer by ARN and the code is extracted to /opt at runtime. A single Layer update propagates to all attached functions without redeployment.",
        "Container images with base image -- Lambda supports container images up to 10 GB. A custom base image can include all shared utility code. Functions built on the base image inherit the utilities without code duplication.",
      ],
      incorrect: [
        "Include in each deployment package -- duplicates the code across all functions; updating the utility requires redeploying every function.",
        "Download from S3 on every invocation -- adds latency to every Lambda invocation; not a code-sharing pattern.",
        "Shared Lambda function invoked synchronously -- creates tight coupling, adds network latency, and counts as two separate Lambda invocations (cost and complexity).",
      ],
    },
  },
  {
    domain: "Troubleshooting & Optimization",
    multi: 1,
    question:
      "A developer's API Gateway + Lambda application returns a 502 Bad Gateway error intermittently. What is the MOST likely cause?",
    opts: [
      "The API Gateway is throttling requests due to exceeding the account-level rate limit",
      "The Lambda function returned a malformed response that API Gateway cannot interpret (missing statusCode or non-JSON body)",
      "The Lambda function execution role lacks API Gateway invocation permissions",
      "The API Gateway stage is not deployed",
    ],
    ans: [1],
    exp: {
      correct: [
        "Malformed Lambda response -- API Gateway expects Lambda Proxy integration responses to include at minimum a statusCode field (integer) and optionally headers (object) and body (string). If Lambda returns null, throws an unhandled exception, or returns a response without statusCode, API Gateway returns 502 Bad Gateway.",
      ],
      incorrect: [
        "API Gateway throttling -- throttling returns 429 Too Many Requests, not 502.",
        "Lambda execution role permissions -- missing invoke permissions would cause a 403 Forbidden or 500 Internal Server Error when API Gateway tries to invoke Lambda; typically a setup-time issue, not intermittent.",
        "Stage not deployed -- an undeployed stage would result in consistent failures, not intermittent ones.",
      ],
    },
  },
  {
    domain: "Storage & Databases",
    multi: 1,
    question:
      "A developer's application requires strongly consistent reads from DynamoDB. By default, DynamoDB reads are eventually consistent. How does a developer request strongly consistent reads?",
    opts: [
      "Use TransactGetItems for all read operations",
      "Set ConsistentRead=True in the GetItem, Query, or Scan operation",
      "Enable DynamoDB Streams on the table",
      "Use a Global Secondary Index (GSI) for all reads",
    ],
    ans: [1],
    exp: {
      correct: [
        "ConsistentRead=True -- setting ConsistentRead=True on GetItem, Query, or Scan requests a strongly consistent read that returns the most up-to-date data. This uses twice the read capacity units compared to eventually consistent reads.",
      ],
      incorrect: [
        "TransactGetItems -- provides serializable isolation for multi-item reads but is for atomic multi-item reads across tables, not simply strongly consistent single-item reads. Also uses 2x RCU.",
        "DynamoDB Streams -- captures item-level change events; does not affect read consistency.",
        "GSI for all reads -- GSIs only support eventually consistent reads; they cannot provide strongly consistent reads.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 1,
    question:
      "A developer's application calls the STS AssumeRole API to get temporary credentials for a cross-account role. The credentials expire after 1 hour. The application runs for 8 hours. What should the developer implement?",
    opts: [
      "Request a 12-hour session duration in the initial AssumeRole call",
      "Implement credential refresh by calling AssumeRole again before the current credentials expire, using a background refresh timer",
      "Store the initial credentials in DynamoDB and reuse them throughout the 8-hour session",
      "Use IAM access keys instead of STS credentials to avoid expiry",
    ],
    ans: [1],
    exp: {
      correct: [
        "Background credential refresh -- STS temporary credentials expire. The application must refresh credentials by calling AssumeRole again before expiry. The AWS SDK has a built-in credential provider chain that auto-refreshes, but custom implementations should refresh proactively (e.g., 5 minutes before expiry) using a background timer.",
      ],
      incorrect: [
        "12-hour session duration in AssumeRole -- role session duration is limited by the role's MaxSessionDuration setting (default 1 hour, max 12 hours). Even with 12 hours, the application must still implement refresh for long-running processes.",
        "Store credentials in DynamoDB -- credentials expire; storing them doesn't prevent expiry or enable refresh.",
        "IAM access keys instead -- long-term IAM access keys are a security anti-pattern. Temporary credentials via STS are preferred; refresh is the solution.",
      ],
    },
  },
  {
    domain: "Deployment",
    multi: 2,
    question:
      "A developer needs to deploy a containerized application to AWS with auto-scaling, load balancing, and minimal infrastructure management. Which TWO options meet these requirements? (Select TWO.)",
    opts: [
      "Amazon ECS with Fargate launch type behind an Application Load Balancer",
      "Amazon EC2 instances with Docker manually installed and a custom load balancer",
      "AWS App Runner for the containerized application",
      "Amazon ECS with EC2 launch type and self-managed Auto Scaling",
      "AWS Batch for the containerized application",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "ECS with Fargate + ALB -- Fargate is serverless for containers (no EC2 management). ECS Service Auto Scaling scales tasks automatically. An ALB provides managed load balancing. Minimal infrastructure management.",
        "AWS App Runner -- a fully managed service for containerized web applications. It handles load balancing, auto-scaling, TLS, and deployment pipelines automatically with no infrastructure configuration required.",
      ],
      incorrect: [
        "EC2 with Docker + custom load balancer -- maximum operational overhead; self-managed everything.",
        "ECS with EC2 launch type and self-managed Auto Scaling -- requires managing EC2 instances, Auto Scaling groups, and cluster capacity; significantly more operational overhead than Fargate.",
        "AWS Batch -- designed for batch computing jobs (HPC, ML training, rendering); not for long-running web services requiring load balancing.",
      ],
    },
  },
  {
    domain: "Monitoring & Observability",
    multi: 1,
    question:
      "A developer wants to create a custom CloudWatch metric to track the number of failed payment transactions processed by a Lambda function. How should this be implemented?",
    opts: [
      "Parse Lambda logs with a CloudWatch Logs metric filter on the word 'payment_failed'",
      "Call the CloudWatch PutMetricData API from the Lambda function code whenever a payment failure occurs",
      "Enable Lambda Enhanced Monitoring which automatically tracks payment failures",
      "Create a CloudWatch Alarm on the Lambda Errors metric filtered by payment transactions",
    ],
    ans: [1],
    exp: {
      correct: [
        "CloudWatch PutMetricData from Lambda -- the developer calls cloudwatch.put_metric_data() (boto3) with a custom namespace, metric name (e.g., 'PaymentFailures'), and value (1) whenever a payment fails. This creates a custom metric that can be graphed, alarmed on, and used in dashboards.",
      ],
      incorrect: [
        "CloudWatch Logs Metric Filter -- a valid alternative approach (filter log lines for payment_failed and emit a metric), but calling PutMetricData directly is more precise and doesn't depend on log format parsing.",
        "Lambda Enhanced Monitoring -- enhanced monitoring provides Lambda-specific metrics (init duration, memory use, etc.); it cannot automatically detect business-logic events like payment failures.",
        "Alarm on Lambda Errors metric filtered by payment transactions -- CloudWatch Alarm metric filters apply to metric dimensions, not the semantic content of individual Lambda invocations.",
      ],
    },
  },
  {
    domain: "Development with AWS Services",
    multi: 1,
    question:
      "A developer is building a Lambda function that must process Kinesis Data Streams records in order. The function sometimes fails on specific records, causing the entire shard to stop processing. What is the BEST approach to handle record failures while continuing to process newer records?",
    opts: [
      "Configure the Lambda event source mapping with BisectBatchOnFunctionError enabled and a destination for failed records",
      "Wrap all record processing in try/catch and always return success from the Lambda handler",
      "Decrease the Kinesis shard count to reduce parallelism",
      "Set the Lambda batch size to 1 so each record is processed individually",
    ],
    ans: [0],
    exp: {
      correct: [
        "BisectBatchOnFunctionError with failure destination -- when BisectBatchOnFunctionError is enabled on the event source mapping, Lambda bisects failed batches to isolate the failing record. Combined with a DestinationConfig pointing to an SQS DLQ or SNS topic, failed records are captured without blocking the shard from continuing to process newer records.",
      ],
      incorrect: [
        "Always return success (swallow errors) -- means problematic records are silently skipped and lost. Data loss is unacceptable.",
        "Decrease shard count -- fewer shards mean less throughput; doesn't solve the failure handling problem.",
        "Batch size of 1 -- isolates failures to individual records but doesn't prevent the shard from blocking. Without BisectBatchOnFunctionError or DLQ, a single failing record still blocks the shard with batch size 1.",
      ],
    },
  },
  {
    domain: "Storage & Databases",
    multi: 1,
    question:
      "A developer needs to implement a leaderboard for a real-time gaming application. The leaderboard stores player scores and must return the top 100 players, sorted by score, in under 1 millisecond. Which AWS service is BEST suited?",
    opts: [
      "Amazon DynamoDB with a GSI sorted by score",
      "Amazon RDS MySQL with an ORDER BY score DESC LIMIT 100 query",
      "Amazon ElastiCache for Redis using a Sorted Set (ZADD/ZRANGE)",
      "Amazon Aurora with a cached result set",
    ],
    ans: [2],
    exp: {
      correct: [
        "ElastiCache for Redis Sorted Sets -- Redis Sorted Sets (ZADD to add/update, ZREVRANGE to get top N) are specifically designed for leaderboards. Operations are O(log N) and run in memory, providing sub-millisecond latency at any scale.",
      ],
      incorrect: [
        "DynamoDB GSI sorted by score -- DynamoDB Query on a GSI sorted by score provides millisecond (not sub-millisecond) latency and GSI reads are eventually consistent. Suitable for moderate requirements but not sub-ms.",
        "RDS MySQL with ORDER BY -- relational databases require disk I/O and query processing; even with indexes, latency is typically tens to hundreds of milliseconds at scale.",
        "Aurora with cached result set -- Aurora's query cache helps but doesn't achieve consistent sub-millisecond latency for dynamic leaderboards with frequent score updates.",
      ],
    },
  },
  {
    domain: "Messaging & Integration",
    multi: 1,
    question:
      "A developer uses Amazon EventBridge to route events from a custom application to multiple targets. The developer needs to ensure that only events where the 'status' field equals 'ERROR' AND the 'service' field equals 'payments' are routed to a specific Lambda. How is this configured?",
    opts: [
      "Create a Lambda function that filters events and routes manually",
      "Define an EventBridge rule with an event pattern matching both conditions: { 'detail': { 'status': ['ERROR'], 'service': ['payments'] } }",
      "Use an SNS filter policy on the EventBridge target subscription",
      "Create two separate EventBridge rules, one per condition, both pointing to the Lambda",
    ],
    ans: [1],
    exp: {
      correct: [
        "EventBridge rule with compound event pattern -- EventBridge rules support JSON event patterns that match multiple fields simultaneously. Specifying both status and service conditions in the detail object creates an AND match: only events satisfying both conditions trigger the rule.",
      ],
      incorrect: [
        "Lambda that filters manually -- puts filtering logic in application code; EventBridge's native pattern matching is more efficient and doesn't invoke Lambda unnecessarily.",
        "SNS filter policy -- SNS filter policies apply to SNS subscriptions, not EventBridge targets.",
        "Two separate rules both pointing to Lambda -- two rules with single conditions each would fire when EITHER condition is met (OR logic), not both (AND logic).",
      ],
    },
  },
  {
    domain: "CI/CD & Developer Tools",
    multi: 1,
    question:
      "A developer wants to run unit tests in CodeBuild and fail the build if code coverage drops below 80%. The test framework outputs a coverage report. What is the CORRECT approach?",
    opts: [
      "Configure a post-build phase that calls the coverage API to check the threshold",
      "In the buildspec.yml build phase, run the test command with coverage checks; exit with a non-zero code if coverage is below 80%",
      "Use a CloudWatch Alarm on CodeBuild metrics to fail the build if coverage is low",
      "Configure the CodePipeline approval stage to manually check coverage reports",
    ],
    ans: [1],
    exp: {
      correct: [
        "Non-zero exit code in buildspec build phase -- CodeBuild marks a build as failed if any command in the phases exits with a non-zero status. Running coverage tools with a minimum threshold flag (e.g., pytest --cov-fail-under=80) or using a shell conditional to check the coverage percentage and exit 1 if below threshold causes CodeBuild to fail the build.",
      ],
      incorrect: [
        "Post-build phase coverage API call -- post-build commands run after the build phase, even if the build phase succeeded. Failing in post-build still marks the build as failed, but running coverage checks in the build phase is cleaner and more standard.",
        "CloudWatch Alarm on CodeBuild metrics -- CodeBuild metrics cover build duration and pass/fail counts; coverage percentage is not a native metric.",
        "CodePipeline manual approval for coverage -- manual approvals require human intervention; automated coverage enforcement should be automatic.",
      ],
    },
  },
  {
    domain: "Security",
    multi: 2,
    question:
      "A developer needs to implement fine-grained access control so that DynamoDB users can only read/write their OWN items in a shared table. Each item has a 'userId' attribute. Which TWO mechanisms enable this? (Select TWO.)",
    opts: [
      "Cognito Identity Pool with IAM role and a policy using condition: dynamodb:LeadingKeys matching the Cognito sub claim",
      "DynamoDB resource-based policy that checks the userId attribute",
      "Lambda Authorizer that injects userId into the request before forwarding to DynamoDB",
      "IAM permission boundary on the user's role restricting access to their userId partition",
      "DynamoDB table-level encryption with per-user KMS keys",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "Cognito Identity Pool + IAM role with dynamodb:LeadingKeys condition -- Cognito Identity Pools issue temporary credentials with an IAM role. The role policy can include a condition: { 'ForAllValues:StringEquals': { 'dynamodb:LeadingKeys': ['${cognito-identity.amazonaws.com:sub}'] } } which limits reads/writes to items where the partition key matches the authenticated user's Cognito ID.",
        "Lambda Authorizer that injects userId -- a Lambda Authorizer can validate the user's token, extract userId, and add it to the API Gateway context. The backend Lambda reads the userId from the authorizer context and uses it to scope DynamoDB queries, enforcing item-level access in application logic.",
      ],
      incorrect: [
        "DynamoDB resource-based policy checking userId -- DynamoDB does not support resource-based policies at the item level; only bucket and table-level policies exist.",
        "IAM permission boundary restricting to userId partition -- permission boundaries limit maximum effective permissions but cannot dynamically match items by attribute value.",
        "Per-user KMS keys -- encrypts data but doesn't restrict which items a user can read/write at the API level.",
      ],
    },
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildShuffledExam(raw: Question[]): Question[] {
  const shuffledQOrder = shuffleArray(raw);
  return shuffledQOrder.map((origQ) => {
    const oldIndices = origQ.opts.map((_, i) => i);
    const shuffledOldIndices = shuffleArray(oldIndices);
    const newOpts = shuffledOldIndices.map((old) => origQ.opts[old]);
    const oldToNew: Record<number, number> = {};
    shuffledOldIndices.forEach((old, newPos) => {
      oldToNew[old] = newPos;
    });
    const newAns = origQ.ans.map((old) => oldToNew[old]);
    return { ...origQ, opts: newOpts, ans: newAns };
  });
}

export default function AWSDeveloperAssociate({ onBack }: { onBack: () => void }) {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Set<number>[]>([]);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [seconds, setSeconds] = useState(130 * 60);
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (!examStarted || paused || done) return;
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, paused, done]);

  const startExam = () => {
    const shuffled = buildShuffledExam(rawQuestions);
    setQuestions(shuffled);
    setAnswers(shuffled.map(() => new Set()));
    setChecked(new Array(shuffled.length).fill(false));
    setExamStarted(true);
    setDone(false);
    setReview(false);
    setPaused(false);
    setCurrentQuestion(0);
    setFlagged(new Set());
    setSeconds(130 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const answeredCount = () => answers.filter((s, i) => s.size > 0 || checked[i]).length;

  const pickOption = (optionIndex: number) => {
    if (checked[currentQuestion] || review || paused) return;
    const question = questions[currentQuestion];
    const newAnswers = [...answers];
    const sel = new Set(newAnswers[currentQuestion]);
    if (question.multi === 1) {
      sel.clear();
      sel.add(optionIndex);
      newAnswers[currentQuestion] = sel;
      setAnswers(newAnswers);
      const newChecked = [...checked];
      newChecked[currentQuestion] = true;
      setChecked(newChecked);
    } else {
      if (sel.has(optionIndex)) {
        sel.delete(optionIndex);
      } else {
        sel.add(optionIndex);
      }
      newAnswers[currentQuestion] = sel;
      setAnswers(newAnswers);
    }
  };

  const checkAnswer = () => {
    if (checked[currentQuestion]) return;
    const newChecked = [...checked];
    newChecked[currentQuestion] = true;
    setChecked(newChecked);
  };

  const goToQuestion = (direction: number) => {
    const next = currentQuestion + direction;
    if (next >= 0 && next < questions.length) setCurrentQuestion(next);
  };

  const toggleFlag = () => {
    if (paused) return;
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion)) newFlagged.delete(currentQuestion);
    else newFlagged.add(currentQuestion);
    setFlagged(newFlagged);
  };

  const jumpToNextFlagged = () => {
    if (flagged.size === 0) {
      alert("No flagged questions.");
      return;
    }
    const arr = Array.from(flagged).sort((a, b) => a - b);
    const next = arr.find((i) => i > currentQuestion) ?? arr[0];
    setCurrentQuestion(next);
  };

  const submitExam = () => {
    if (!confirm("Submit exam? You cannot change answers after submitting.")) return;
    setDone(true);
  };

  const reviewAll = () => {
    setReview(true);
    setDone(false);
    setCurrentQuestion(0);
  };

  const restart = () => {
    if (!confirm("Start a new exam with reshuffled questions? All answers will be cleared.")) return;
    startExam();
  };

  // ─── START SCREEN ──────────────────────────────────────────────────────────
  if (!examStarted) {
    return (
      <div className='relative min-h-screen'>
        <div
          className='fixed inset-0 bg-cover'
          style={{
            backgroundImage: "url(/bg.jpg)",
            backgroundPosition: "center 0%",
            backgroundAttachment: "fixed",
          }}
        />
        <div
          className='fixed inset-0'
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)",
          }}
        />
        <div className='relative z-10 container mx-auto px-4 py-12 max-w-4xl'>
          <button
            onClick={onBack}
            className='mb-8 text-base tracking-wide transition-all hover:text-[#f2d8e8] hover:translate-x-1'
            style={{ color: "#b89ab8" }}
          >
            ← Back to Dashboard
          </button>

          <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] border-l-4 border-l-[#f5a623] p-8 backdrop-blur-sm'>
            <div className='mb-8'>
              <span
                className='inline-block text-sm px-3 py-2 border border-[rgba(245,166,35,0.4)] bg-[rgba(10,5,20,0.6)] tracking-wider'
                style={{ color: "#f5a623" }}
              >
                DVA-C02
              </span>
              <h1
                className='text-4xl mt-4 mb-2 tracking-wider'
                style={{
                  color: "#f2d8e8",
                  textShadow: "2px 2px 0 #3a1040, 0 0 12px rgba(245,166,35,0.4)",
                }}
              >
                AWS Developer Associate
              </h1>
              <p className='text-base tracking-wide mt-2' style={{ color: "#9a88b8" }}>
                Challenging scenario-based practice exam — built to reflect the real DVA-C02 difficulty
              </p>
            </div>

            <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-6 mb-8'>
              <h2 className='text-2xl mb-4 tracking-wide' style={{ color: "#ede0f5" }}>
                Exam Details
              </h2>
              <div className='space-y-3 text-base tracking-wide' style={{ color: "#9a88b8" }}>
                {[
                  `${rawQuestions.length} questions`,
                  "130 minutes (matches real exam duration)",
                  "Passing score: 72%",
                  "Domains: Development with AWS Services · Security · Deployment · Troubleshooting & Optimization · Messaging & Integration · Storage & Databases · Monitoring & Observability · CI/CD & Developer Tools",
                  "Mix of single-select and multi-select scenario questions",
                  "Questions and answers reshuffled on every attempt",
                ].map((item, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <span style={{ color: "#f5a623" }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={startExam}
              className='w-full py-4 text-lg font-semibold tracking-wide transition-all bg-[rgba(80,50,110,0.55)] hover:bg-[rgba(100,70,130,0.7)] border border-[rgba(180,140,200,0.22)]'
              style={{ color: "#ede0f5" }}
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS SCREEN ────────────────────────────────────────────────────────
  if (done && !review) {
    const total = questions.length;
    let correct = 0;
    questions.forEach((question, i) => {
      if (question.ans.length === answers[i].size && question.ans.every((a) => answers[i].has(a))) correct++;
    });
    const pct = Math.round((correct / total) * 100);
    const passed = pct >= 72;
    const unanswered = answers.filter((s, i) => s.size === 0 && !checked[i]).length;
    const used = 130 * 60 - seconds;
    const mins = Math.floor(used / 60);
    const scs = used % 60;

    const domainScores: Record<string, { correct: number; total: number }> = {};
    questions.forEach((question, i) => {
      if (!domainScores[question.domain]) domainScores[question.domain] = { correct: 0, total: 0 };
      domainScores[question.domain].total++;
      if (question.ans.length === answers[i].size && question.ans.every((a) => answers[i].has(a)))
        domainScores[question.domain].correct++;
    });

    return (
      <div className='relative min-h-screen'>
        <div
          className='fixed inset-0 bg-cover'
          style={{ backgroundImage: "url(/bg.jpg)", backgroundPosition: "center 0%", backgroundAttachment: "fixed" }}
        />
        <div
          className='fixed inset-0'
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)",
          }}
        />
        <div className='relative z-10 container mx-auto px-4 py-12 max-w-4xl'>
          <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-8 backdrop-blur-sm text-center'>
            <div className='text-7xl font-bold mb-4' style={{ color: passed ? "#1D9E75" : "#c0392b" }}>
              {pct}%
            </div>
            <div className='text-2xl font-semibold mb-2' style={{ color: passed ? "#1D9E75" : "#c0392b" }}>
              {passed ? "PASS — Great work!" : "FAIL — Review your weak areas"}
            </div>
            <div className='text-base mb-8' style={{ color: "#9a88b8" }}>
              (passing score: 72%)
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              {[
                { label: "Correct", value: correct, color: "#1D9E75" },
                { label: "Incorrect", value: total - correct - unanswered, color: "#c0392b" },
                { label: "Unanswered", value: unanswered, color: "#ede0f5" },
                { label: "Time used", value: `${mins}:${String(scs).padStart(2, "0")}`, color: "#ede0f5" },
              ].map((stat) => (
                <div key={stat.label} className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4'>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#9a88b8" }}>
                    {stat.label}
                  </div>
                  <div className='text-3xl font-bold' style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className='text-left mb-8'>
              <h4 className='text-lg font-semibold mb-4' style={{ color: "#ede0f5" }}>
                Performance by Domain
              </h4>
              <div className='space-y-4'>
                {Object.entries(domainScores).map(([domain, score]) => {
                  const domainPct = Math.round((score.correct / score.total) * 100);
                  return (
                    <div key={domain}>
                      <div className='flex justify-between text-sm mb-2' style={{ color: "#9a88b8" }}>
                        <span>{domain}</span>
                        <span>
                          {score.correct}/{score.total} ({domainPct}%)
                        </span>
                      </div>
                      <div className='h-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)]'>
                        <div
                          className='h-full transition-all'
                          style={{ width: `${domainPct}%`, background: domainPct >= 72 ? "#1D9E75" : "#c0392b" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='space-y-3'>
              <button
                onClick={reviewAll}
                className='w-full py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(80,50,110,0.55)] hover:bg-[rgba(100,70,130,0.7)] border border-[rgba(180,140,200,0.22)]'
                style={{ color: "#ede0f5" }}
              >
                Review All Questions & Explanations
              </button>
              <button
                onClick={restart}
                className='w-full py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(10,5,20,0.6)] hover:bg-[rgba(40,30,50,0.6)] border border-[rgba(180,140,200,0.22)]'
                style={{ color: "#ede0f5" }}
              >
                New Shuffle & Start Over
              </button>
              <button
                onClick={onBack}
                className='w-full py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(10,5,20,0.6)] hover:bg-[rgba(40,30,50,0.6)] border border-[rgba(180,140,200,0.22)]'
                style={{ color: "#ede0f5" }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── QUESTION SCREEN ───────────────────────────────────────────────────────
  const question = questions[currentQuestion];
  const sel = answers[currentQuestion];
  const locked = checked[currentQuestion] || review;
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  const multi = question.multi > 1;

  return (
    <div className='relative min-h-screen'>
      <div
        className='fixed inset-0 bg-cover'
        style={{ backgroundImage: "url(/bg.jpg)", backgroundPosition: "center 0%", backgroundAttachment: "fixed" }}
      />
      <div
        className='fixed inset-0'
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)",
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-8 max-w-5xl'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4 bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-4 backdrop-blur-sm'>
          <h2 className='text-xl tracking-wide' style={{ color: "#f2d8e8" }}>
            DVA-C02 Practice Exam
          </h2>
          <div className='flex items-center gap-3'>
            <div
              className={`text-base font-bold px-4 py-2 border ${seconds <= 300 ? "animate-pulse" : ""}`}
              style={{
                color: seconds <= 300 ? "#c0392b" : "#ede0f5",
                background: seconds <= 300 ? "rgba(192,57,43,0.15)" : "rgba(10,5,20,0.6)",
                borderColor: seconds <= 300 ? "#c0392b" : "rgba(180,140,200,0.3)",
              }}
            >
              {formatTime(seconds)}
            </div>
            <button
              onClick={() => setPaused(!paused)}
              className='px-4 py-2 text-sm tracking-wide transition-all bg-[rgba(10,5,20,0.6)] hover:bg-[rgba(40,30,50,0.6)] border border-[rgba(180,140,200,0.22)]'
              style={{ color: "#ede0f5" }}
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={() => {
                if (confirm("Exit exam? All progress will be lost.")) {
                  setExamStarted(false);
                  setQuestions([]);
                  setAnswers([]);
                  setChecked([]);
                  setCurrentQuestion(0);
                  setFlagged(new Set());
                  setDone(false);
                  setReview(false);
                  setPaused(false);
                  setSeconds(130 * 60);
                }
              }}
              className='px-4 py-2 text-sm tracking-wide transition-all bg-[rgba(192,57,43,0.2)] hover:bg-[rgba(192,57,43,0.3)] border border-[rgba(192,57,43,0.5)]'
              style={{ color: "#f1948a" }}
            >
              Exit Exam
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-4 backdrop-blur-sm mb-4'>
          <div className='flex justify-between text-sm mb-2' style={{ color: "#9a88b8" }}>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>
              {answeredCount()} answered · {flagged.size} flagged
            </span>
          </div>
          <div className='h-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)]'>
            <div className='h-full transition-all' style={{ width: `${progress}%`, background: "#f5a623" }} />
          </div>
        </div>

        {/* Pause overlay */}
        {paused && (
          <div className='fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50 flex items-center justify-center'>
            <div className='bg-[rgba(15,8,28,0.95)] border border-[rgba(180,140,200,0.22)] p-8 text-center max-w-md'>
              <h3 className='text-3xl mb-4' style={{ color: "#f2d8e8" }}>
                Exam Paused
              </h3>
              <p className='text-base mb-6' style={{ color: "#9a88b8" }}>
                Timer stopped. Your answers are saved.
              </p>
              <button
                onClick={() => setPaused(false)}
                className='px-8 py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(80,50,110,0.55)] hover:bg-[rgba(100,70,130,0.7)] border border-[rgba(180,140,200,0.22)]'
                style={{ color: "#ede0f5" }}
              >
                Resume Exam
              </button>
            </div>
          </div>
        )}

        {review && (
          <div
            className='bg-[#fff8e1] border border-[#ffe082] p-3 mb-4 text-center text-sm font-semibold'
            style={{ color: "#a67c00" }}
          >
            Review Mode — all answers revealed with explanations
          </div>
        )}

        {/* Question card */}
        <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm mb-4'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3 flex-wrap'>
              <span className='text-xs uppercase tracking-wider' style={{ color: "#9a88b8" }}>
                question{currentQuestion + 1}
              </span>
              <span
                className='text-xs px-3 py-1 border border-[rgba(245,166,35,0.4)] bg-[rgba(10,5,20,0.6)]'
                style={{ color: "#f5a623" }}
              >
                {question.domain}
              </span>
              {multi && (
                <span
                  className='text-xs px-3 py-1 border font-semibold'
                  style={{ background: "#fff3e0", color: "#e65100", borderColor: "#ffcc80" }}
                >
                  Select {question.multi}
                </span>
              )}
            </div>
            <button
              onClick={toggleFlag}
              className='text-2xl transition-colors'
              style={{ color: flagged.has(currentQuestion) ? "#f5a623" : "#666" }}
            >
              {flagged.has(currentQuestion) ? "⚑" : "⚐"}
            </button>
          </div>

          <div className='text-base leading-relaxed mb-6' style={{ color: "#ede0f5" }}>
            {question.question}
          </div>

          {multi && (
            <div className='text-sm italic mb-4' style={{ color: "#9a88b8" }}>
              Select exactly {question.multi} answers.
            </div>
          )}

          <div className='space-y-3'>
            {question.opts.map((opt, i) => {
              let bgColor = "rgba(10,5,20,0.6)";
              let borderColor = "rgba(180,140,200,0.3)";
              let textColor = "#ede0f5";

              if (locked) {
                if (question.ans.includes(i) && sel.has(i)) {
                  bgColor = "rgba(29,158,117,0.2)";
                  borderColor = "#1D9E75";
                  textColor = "#b4f2d1";
                } else if (question.ans.includes(i) && !sel.has(i)) {
                  bgColor = "rgba(243,156,18,0.2)";
                  borderColor = "#f39c12";
                  textColor = "#f8c471";
                } else if (!question.ans.includes(i) && sel.has(i)) {
                  bgColor = "rgba(192,57,43,0.2)";
                  borderColor = "#c0392b";
                  textColor = "#f1948a";
                }
              } else if (sel.has(i)) {
                bgColor = "rgba(74,144,217,0.2)";
                borderColor = "#4a90d9";
                textColor = "#a2c8f0";
              }

              return (
                <div
                  key={i}
                  onClick={() => pickOption(i)}
                  className={`flex items-start gap-3 p-4 border transition-all ${
                    !locked && !paused ? "cursor-pointer hover:bg-[rgba(80,50,110,0.3)]" : ""
                  }`}
                  style={{ background: bgColor, borderColor: borderColor, color: textColor }}
                >
                  {multi ? (
                    <div
                      className='w-4 h-4 border-2 flex items-center justify-center text-xs shrink-0 mt-0.5'
                      style={{ borderColor: sel.has(i) || locked ? borderColor : "#666" }}
                    >
                      {sel.has(i) && "✓"}
                    </div>
                  ) : (
                    <div
                      className='w-4 h-4 border-2 rounded-full flex items-center justify-center shrink-0 mt-0.5'
                      style={{ borderColor: sel.has(i) || locked ? borderColor : "#666" }}
                    >
                      {sel.has(i) && <div className='w-2 h-2 rounded-full' style={{ background: textColor }} />}
                    </div>
                  )}
                  <div className='flex-1'>
                    <span className='font-semibold mr-2'>{"ABCDE"[i]}.</span>
                    {opt}
                  </div>
                </div>
              );
            })}
          </div>

          {multi && !locked && sel.size > 0 && (
            <button
              onClick={checkAnswer}
              className='w-full mt-4 py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(74,144,217,0.2)] hover:bg-[rgba(74,144,217,0.3)] border'
              style={{ color: "#4a90d9", borderColor: "#4a90d9" }}
            >
              Check Answer (select {question.multi})
            </button>
          )}

          {locked && (
            <div className='mt-6 border border-[rgba(180,140,200,0.22)]'>
              <div
                className='px-4 py-2 text-xs uppercase tracking-wider font-semibold'
                style={{ background: "#1D9E75", color: "#fff" }}
              >
                Explanation
              </div>
              <div
                className='p-4 text-sm leading-relaxed'
                style={{ background: "rgba(29,158,117,0.1)", color: "#b4f2d1" }}
              >
                {question.exp.correct.map((exp, idx) => (
                  <div key={idx} className='mb-3'>
                    <span className='font-semibold' style={{ color: "#1D9E75" }}>
                      CORRECT:
                    </span>{" "}
                    {exp}
                  </div>
                ))}
                {question.exp.incorrect.map((exp, idx) => (
                  <div key={idx} className='mb-3'>
                    <span className='font-semibold' style={{ color: "#c0392b" }}>
                      INCORRECT:
                    </span>{" "}
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className='flex gap-3'>
          <button
            onClick={() => goToQuestion(-1)}
            disabled={currentQuestion === 0}
            className='flex-1 py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(10,5,20,0.6)] hover:bg-[rgba(40,30,50,0.6)] border border-[rgba(180,140,200,0.22)] disabled:opacity-30 disabled:cursor-not-allowed'
            style={{ color: "#ede0f5" }}
          >
            ← Prev
          </button>
          <button
            onClick={jumpToNextFlagged}
            className='px-6 py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(10,5,20,0.6)] hover:bg-[rgba(40,30,50,0.6)] border border-[rgba(180,140,200,0.22)]'
            style={{ color: "#ede0f5" }}
          >
            ⚑ ({flagged.size})
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => goToQuestion(1)}
              className='flex-1 py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(10,5,20,0.6)] hover:bg-[rgba(40,30,50,0.6)] border border-[rgba(180,140,200,0.22)]'
              style={{ color: "#ede0f5" }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submitExam}
              className='flex-1 py-3 text-base font-semibold tracking-wide transition-all bg-[rgba(80,50,110,0.55)] hover:bg-[rgba(100,70,130,0.7)] border border-[rgba(180,140,200,0.22)]'
              style={{ color: "#ede0f5" }}
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
