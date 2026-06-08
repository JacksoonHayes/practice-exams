import { useEffect, useState } from "react";
import type { Question } from "../../types";

const RAW_QUESTIONS: Question[] = [
  {
    domain: "Cloud Concepts",
    multi: 2,
    q: "When an organization leverages the AWS Cloud Adoption Framework (AWS CAF) for migrating to the cloud, which TWO of the following would most likely be the primary stakeholders involved?",
    opts: [
      "Chief Information Officers (CIOs)",
      "Engineers",
      "Chief Financial Officers (CFOs)",
      "Project Managers",
      "IT Architects",
    ],
    ans: [0, 4],
    exp: {
      correct: [
        "Chief Information Officers (CIOs) -- oversee the entire migration strategy and ensure IT aligns with business objectives.",
        "IT Architects -- design the cloud infrastructure to support the organization's IT strategies efficiently.",
      ],
      incorrect: [
        "Engineers -- involved in execution, not the strategic planning phase of the CAF.",
        "Chief Financial Officers (CFOs) -- handle budgetary concerns but are not primary CAF stakeholders.",
        "Project Managers -- manage timelines and resources but don't set strategic direction in the CAF context.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 2,
    q: "When a company moves an on-premises, internet-facing website to the AWS Cloud, what benefits does it obtain? (Select TWO.)",
    opts: [
      "Data stored in AWS is automatically encrypted",
      "Website capacity can expand or contract as website traffic changes",
      "AWS automatically provides the lowest-cost pricing model",
      "The website shows up with higher priority in internet search engines",
      "The company can take advantage of the pay-as-you-go pricing model",
    ],
    ans: [1, 4],
    exp: {
      correct: [
        "Website capacity can expand or contract as website traffic changes -- this is elasticity, a core AWS benefit.",
        "Pay-as-you-go pricing model -- customers only pay for the resources they consume, with no upfront cost.",
      ],
      incorrect: [
        "Data is NOT automatically encrypted -- encryption must be configured by the customer.",
        "AWS does not automatically provide the lowest-cost pricing model -- cost optimization requires configuration.",
        "AWS has no effect on SEO or search engine rankings.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "Which AWS Cloud design principle states that systems should be able to withstand the failure of a single component and continue operating normally?",
    opts: ["Elasticity", "Fault tolerance", "High availability", "Scalability"],
    ans: [1],
    exp: {
      correct: [
        "Fault tolerance -- a fault-tolerant system is designed to continue operating even when components fail, with no service disruption.",
      ],
      incorrect: [
        "Elasticity -- the ability to scale resources in/out. Does not address failure scenarios.",
        "High availability -- minimizes downtime, but some disruption may occur. Fault tolerance implies zero disruption.",
        "Scalability -- the ability to handle increased load, not about failure resilience.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 2,
    q: "Which AWS services are delivered globally rather than regionally? (Select TWO.)",
    opts: ["Amazon EC2", "Amazon CloudFront", "Amazon Route 53", "Amazon VPC", "Amazon RDS"],
    ans: [1, 2],
    exp: {
      correct: [
        "Amazon CloudFront -- a global CDN with edge locations worldwide, not tied to a single region.",
        "Amazon Route 53 -- a global DNS service that operates across all AWS regions automatically.",
      ],
      incorrect: [
        "Amazon EC2 -- instances are launched in specific regions and Availability Zones.",
        "Amazon VPC -- VPCs are regional constructs, tied to a specific AWS region.",
        "Amazon RDS -- databases are deployed into a specific region and optionally replicated.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "A startup wants to move quickly, experiment, and innovate without large upfront costs. Which characteristic of AWS Cloud computing BEST supports this objective?",
    opts: [
      "Trade fixed expense for variable expense",
      "Benefit from massive economies of scale",
      "Increase speed and agility",
      "Go global in minutes",
    ],
    ans: [2],
    exp: {
      correct: [
        "Increase speed and agility -- AWS allows developers to provision resources in minutes and experiment without large upfront costs, enabling rapid innovation.",
      ],
      incorrect: [
        "Trade fixed for variable expense -- relates to cost model, not speed of innovation.",
        "Economies of scale -- a pricing benefit, not an agility driver.",
        "Go global in minutes -- relevant to deployment reach, not the innovation/experimentation cycle.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "Which of the following MOST accurately describes an AWS Local Zone?",
    opts: [
      "A separate AWS region designed for government workloads",
      "An extension of an AWS Region that places compute, storage, and database services closer to end-users in specific metropolitan areas",
      "A collection of data centers within a single Availability Zone",
      "A dedicated physical server allocated to a single AWS customer",
    ],
    ans: [1],
    exp: {
      correct: [
        "AWS Local Zones extend AWS infrastructure to metropolitan areas, placing latency-sensitive services closer to users. They appear as AZ extensions of the parent region.",
      ],
      incorrect: [
        "AWS GovCloud is the offering for government workloads, not Local Zones.",
        "Local Zones are not within a single AZ -- they are separate extensions of a Region.",
        "Dedicated physical servers describe EC2 Dedicated Hosts, not Local Zones.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "A company is planning to move to AWS and wants to understand the full economic benefit compared with their current on-premises costs. Which AWS program or tool is BEST suited for this analysis?",
    opts: ["AWS Pricing Calculator", "AWS Migration Evaluator (TCO Calculator)", "AWS Cost Explorer", "AWS Budgets"],
    ans: [1],
    exp: {
      correct: [
        "AWS Migration Evaluator (formerly TCO Calculator) helps compare the total cost of running workloads on-premises vs. on AWS, accounting for hardware, facilities, staffing, and more.",
      ],
      incorrect: [
        "AWS Pricing Calculator estimates AWS costs only -- it does not compare to on-premises.",
        "AWS Cost Explorer analyzes existing AWS spending -- it doesn't model on-premises costs.",
        "AWS Budgets sets spending alerts on current AWS usage -- not a migration planning tool.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "According to the AWS Well-Architected Framework, which pillar focuses on the ability of a workload to recover from infrastructure or service disruptions and dynamically acquire resources to meet demand?",
    opts: ["Security", "Performance Efficiency", "Reliability", "Operational Excellence"],
    ans: [2],
    exp: {
      correct: [
        "Reliability -- this pillar focuses on a workload's ability to perform its intended function correctly and consistently, including recovery from failures.",
      ],
      incorrect: [
        "Security -- focuses on protecting information, systems, and assets.",
        "Performance Efficiency -- focuses on using computing resources efficiently.",
        "Operational Excellence -- focuses on running and monitoring systems to deliver business value.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "Which of the six Rs of cloud migration describes rebuilding an application from scratch to take full advantage of cloud-native features such as serverless and microservices?",
    opts: [
      "Rehost (Lift and Shift)",
      "Replatform (Lift, Tinker, Shift)",
      "Repurchase (Drop and Shop)",
      "Re-architect (Refactor)",
    ],
    ans: [3],
    exp: {
      correct: [
        "Re-architect (Refactor) -- involves rebuilding or redesigning an application to be cloud-native, often using microservices, serverless, or containers. Highest effort but greatest benefit.",
      ],
      incorrect: [
        "Rehost (Lift and Shift) -- moves applications to AWS with no changes.",
        "Replatform (Lift, Tinker, Shift) -- makes minor optimizations (e.g., moving to managed DB) without changing core architecture.",
        "Repurchase (Drop and Shop) -- replaces existing software with a SaaS product.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 1,
    q: "Which of the following describes the 'Operational Excellence' pillar of the AWS Well-Architected Framework?",
    opts: [
      "Protecting information and systems from unauthorized access",
      "The ability to run and monitor systems to deliver business value and continually improve supporting processes and procedures",
      "Using computing resources efficiently to meet system requirements and maintain efficiency as demand changes",
      "The ability to recover from failures and dynamically acquire resources to meet demand",
    ],
    ans: [1],
    exp: {
      correct: [
        "Operational Excellence -- focuses on running and monitoring systems, automating changes, responding to events, and defining standards to manage daily operations and continually improve.",
      ],
      incorrect: [
        "Protecting information and systems -- describes the Security pillar.",
        "Using computing resources efficiently -- describes the Performance Efficiency pillar.",
        "Recover from failures and acquire resources dynamically -- describes the Reliability pillar.",
      ],
    },
  },
  {
    domain: "Cloud Concepts",
    multi: 2,
    q: "A company is evaluating whether to build a new application on AWS or in their own data center. Which TWO characteristics of cloud computing would MOST help them avoid large upfront capital expenditures? (Select TWO.)",
    opts: [
      "High availability",
      "Pay-as-you-go pricing",
      "Elasticity",
      "Variable expense model replaces CapEx",
      "Global reach",
    ],
    ans: [1, 3],
    exp: {
      correct: [
        "Pay-as-you-go pricing -- eliminates large upfront costs; you pay only for what you use when you use it.",
        "Variable expense model replaces CapEx -- replaces capital expenditure with operational expenditure, meaning costs scale with usage rather than requiring large upfront investments.",
      ],
      incorrect: [
        "High availability -- a design outcome, not a pricing model that eliminates CapEx.",
        "Elasticity -- the ability to scale; related but the financial model is the direct answer to CapEx elimination.",
        "Global reach -- the ability to deploy globally; does not directly address CapEx.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 2,
    q: "A company is looking to centrally configure and manage firewall rules across their entire AWS environment. Which TWO AWS services can assist in applying firewall rules consistently across AWS VPCs and accounts? (Select TWO.)",
    opts: [
      "AWS Web Application Firewall (AWS WAF)",
      "AWS Firewall Manager",
      "Amazon Inspector",
      "AWS Network Firewall",
      "AWS Shield",
    ],
    ans: [1, 3],
    exp: {
      correct: [
        "AWS Firewall Manager -- allows central management of firewall rules (WAF, Shield, Security Groups, Network Firewall) across multiple accounts and VPCs in AWS Organizations.",
        "AWS Network Firewall -- a managed stateful network firewall that can be applied across VPCs to filter traffic at the network level.",
      ],
      incorrect: [
        "AWS WAF -- protects web applications from exploits but does not provide centralized management across VPCs by itself.",
        "Amazon Inspector -- a vulnerability assessment service, not a firewall management tool.",
        "AWS Shield -- provides DDoS protection but not general firewall rule management.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "Which AWS service supports a fully managed, durable, in-memory database compatible with Redis, delivering sub-millisecond latency for caching, session stores, and real-time analytics?",
    opts: ["Amazon DynamoDB", "Amazon RDS", "Amazon MemoryDB for Redis", "Amazon Redshift"],
    ans: [2],
    exp: {
      correct: [
        "Amazon MemoryDB for Redis -- a durable, in-memory database service fully compatible with Redis, delivering ultra-fast performance for real-time applications.",
      ],
      incorrect: [
        "Amazon DynamoDB -- a NoSQL database with single-digit ms latency but is disk-based, not in-memory Redis-compatible.",
        "Amazon RDS -- a managed relational database; not an in-memory store.",
        "Amazon Redshift -- a columnar data warehouse for analytics, not a low-latency in-memory store.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 2,
    q: "Which AWS services facilitate building secure and scalable mobile and web applications with features such as real-time data synchronization and offline functionality? (Select TWO.)",
    opts: ["AWS Lambda", "AWS AppSync", "AWS Amplify", "AWS CodeDeploy", "Amazon API Gateway"],
    ans: [1, 2],
    exp: {
      correct: [
        "AWS AppSync -- a managed GraphQL service that enables real-time data synchronization and offline functionality for mobile and web apps.",
        "AWS Amplify -- a set of tools and services for building full-stack web and mobile apps on AWS, with built-in support for real-time and offline capabilities.",
      ],
      incorrect: [
        "AWS Lambda -- a compute service for running backend functions; does not inherently provide real-time sync or offline features.",
        "AWS CodeDeploy -- automates application deployments; is not an app development framework.",
        "Amazon API Gateway -- creates and manages APIs but does not provide real-time sync or offline app features on its own.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "A security engineer needs to store and automatically rotate database credentials, API keys, and OAuth tokens on a schedule. Which AWS service is BEST suited for this?",
    opts: ["AWS KMS", "AWS Secrets Manager", "AWS Systems Manager Parameter Store", "AWS Certificate Manager"],
    ans: [1],
    exp: {
      correct: [
        "AWS Secrets Manager -- specifically designed to store, manage, and automatically rotate secrets such as database credentials, API keys, and OAuth tokens.",
      ],
      incorrect: [
        "AWS KMS -- manages encryption keys, not application secrets like database passwords.",
        "AWS Systems Manager Parameter Store -- can store secrets but does not natively support automatic rotation.",
        "AWS Certificate Manager -- manages SSL/TLS certificates, not application secrets.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "Which AWS service provides a unified view of security alerts and compliance status across multiple AWS accounts, aggregating findings from GuardDuty, Amazon Inspector, and Amazon Macie into a single dashboard?",
    opts: ["AWS Config", "Amazon Detective", "AWS Security Hub", "AWS Trusted Advisor"],
    ans: [2],
    exp: {
      correct: [
        "AWS Security Hub -- provides a comprehensive view of security alerts and compliance status by aggregating, organizing, and prioritizing findings from multiple AWS security services.",
      ],
      incorrect: [
        "AWS Config -- tracks resource configuration changes and evaluates compliance rules, but does not aggregate security findings from other services.",
        "Amazon Detective -- used for investigating security incidents after they occur, not for centralized security finding aggregation.",
        "AWS Trusted Advisor -- provides best practice recommendations; does not aggregate GuardDuty/Inspector findings.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "An IAM policy contains: Effect: Deny, Action: s3:*, Resource: *. This policy is attached to a user who also has a separate Allow policy granting full S3 access. What is the effective result?",
    opts: [
      "The Allow policy takes precedence and the user can access S3",
      "The Deny takes precedence and the user cannot perform any S3 actions",
      "The most recently attached policy wins",
      "The result depends on whether the policies are inline or AWS managed",
    ],
    ans: [1],
    exp: {
      correct: [
        "An explicit Deny in IAM always overrides any Allow. Regardless of other Allow policies, an explicit Deny will prevent access. This is a fundamental IAM evaluation principle.",
      ],
      incorrect: [
        "Allow never takes precedence over an explicit Deny.",
        "IAM does not use 'most recently applied' logic -- explicit Deny always wins.",
        "Inline vs. managed policy type does not affect the Deny override behavior.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 2,
    q: "A company wants to protect its web application from SQL injection and XSS attacks, AND scan its EC2 instances for software vulnerabilities. Which TWO AWS services should they use? (Select TWO.)",
    opts: ["AWS Shield Standard", "AWS WAF", "Amazon Inspector", "Amazon GuardDuty", "AWS Config"],
    ans: [1, 2],
    exp: {
      correct: [
        "AWS WAF -- a web application firewall that protects against common web exploits like SQL injection, XSS, and other OWASP Top 10 threats.",
        "Amazon Inspector -- automatically scans EC2 instances and container images for software vulnerabilities and unintended network exposure.",
      ],
      incorrect: [
        "AWS Shield Standard -- provides DDoS protection, not application-layer attack filtering.",
        "Amazon GuardDuty -- detects threats via log analysis, not active application-layer filtering or vulnerability scanning.",
        "AWS Config -- tracks configuration compliance, not web application attacks or instance vulnerabilities.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "A company with multiple AWS accounts needs a central mechanism to restrict what actions can be performed in child accounts -- even by account administrators and the root user. Which feature should they use?",
    opts: [
      "IAM Permission Boundaries",
      "AWS Organizations Service Control Policies (SCPs)",
      "Resource-based Policies",
      "IAM Identity Center Permission Sets",
    ],
    ans: [1],
    exp: {
      correct: [
        "Service Control Policies (SCPs) in AWS Organizations apply guardrails at the account or OU level. They restrict the maximum permissions available in an account, even for the root user.",
      ],
      incorrect: [
        "IAM Permission Boundaries -- limit the maximum permissions of individual IAM entities, not across entire accounts.",
        "Resource-based policies -- attached to resources like S3 buckets; do not apply org-wide restrictions.",
        "IAM Identity Center Permission Sets -- manage SSO access but do not restrict account-level permissions across an org.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "Which AWS service uses machine learning to automatically discover, classify, and protect sensitive data such as Personally Identifiable Information (PII) stored in Amazon S3?",
    opts: ["Amazon GuardDuty", "Amazon Inspector", "Amazon Macie", "AWS Config"],
    ans: [2],
    exp: {
      correct: [
        "Amazon Macie -- uses machine learning to discover and protect sensitive data in S3, including PII like names, credit card numbers, and social security numbers.",
      ],
      incorrect: [
        "Amazon GuardDuty -- detects threats via CloudTrail, VPC Flow Logs, and DNS logs; does not classify S3 data.",
        "Amazon Inspector -- scans for software vulnerabilities in EC2 and container images.",
        "AWS Config -- evaluates resource configuration compliance; does not analyze data content.",
      ],
    },
  },
  {
    domain: "Security & Compliance",
    multi: 1,
    q: "A company's security team wants immediate notifications whenever the AWS root account is used to sign in to the AWS Management Console. Which combination of services achieves this MOST effectively?",
    opts: [
      "Amazon GuardDuty + Amazon SNS",
      "AWS CloudTrail + Amazon CloudWatch Alarms + Amazon SNS",
      "AWS Config + AWS Lambda",
      "Amazon Inspector + Amazon EventBridge",
    ],
    ans: [1],
    exp: {
      correct: [
        "AWS CloudTrail records the root account login API event → Amazon CloudWatch creates a metric filter and alarm on that event → Amazon SNS sends the notification. This is the standard AWS pattern for real-time security alerting on CloudTrail events.",
      ],
      incorrect: [
        "GuardDuty detects threats but does not specifically alarm on root login events in real time with direct SNS integration.",
        "AWS Config + Lambda -- Config tracks configuration changes, not login events.",
        "Amazon Inspector -- scans for vulnerabilities; does not monitor console login events.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 2,
    q: "A company needs to ingest and process large volumes of real-time streaming data from IoT devices for immediate analysis. Which TWO AWS services are MOST appropriate? (Select TWO.)",
    opts: [
      "Amazon Kinesis Data Streams",
      "AWS Snowball",
      "Amazon Kinesis Data Firehose",
      "Amazon S3 Glacier",
      "AWS Batch",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "Amazon Kinesis Data Streams -- ingests large streams of data records in real time for custom processing applications.",
        "Amazon Kinesis Data Firehose -- reliably loads streaming data into data stores like S3, Redshift, and OpenSearch for near-real-time analysis.",
      ],
      incorrect: [
        "AWS Snowball -- a physical device for offline data migration; not for real-time streaming.",
        "Amazon S3 Glacier -- cold storage for archival data; not for streaming.",
        "AWS Batch -- for scheduled batch computing jobs, not real-time streaming workloads.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "A solutions architect needs to deploy a consistent AWS CloudFormation stack across 15 AWS accounts in 3 different regions simultaneously. Which AWS service enables this?",
    opts: ["AWS Elastic Beanstalk", "AWS CloudFormation StackSets", "AWS Service Catalog", "AWS OpsWorks"],
    ans: [1],
    exp: {
      correct: [
        "AWS CloudFormation StackSets -- extends CloudFormation stacks to deploy across multiple accounts and regions simultaneously from a single operation and template.",
      ],
      incorrect: [
        "AWS Elastic Beanstalk -- deploys applications within a single account/region; does not support multi-account deployment natively.",
        "AWS Service Catalog -- manages approved products for deployment but is not designed for cross-account/region stack deployment.",
        "AWS OpsWorks -- a configuration management service using Chef/Puppet; not a cross-account deployment tool.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which Amazon S3 storage class is MOST cost-effective for data that is accessed once a month, requires millisecond retrieval, and has unpredictable access patterns?",
    opts: [
      "S3 Standard",
      "S3 Standard-Infrequent Access (S3 Standard-IA)",
      "S3 Glacier Instant Retrieval",
      "S3 Glacier Deep Archive",
    ],
    ans: [1],
    exp: {
      correct: [
        "S3 Standard-Infrequent Access (S3 Standard-IA) -- designed for data accessed less frequently but requiring rapid access when needed. Lower storage cost than S3 Standard with a per-retrieval fee.",
      ],
      incorrect: [
        "S3 Standard -- higher storage cost; designed for frequently accessed data.",
        "S3 Glacier Instant Retrieval -- optimal for archive data accessed once a quarter, not monthly.",
        "S3 Glacier Deep Archive -- cheapest storage but retrieval takes 12 hours; not suitable for ms latency requirements.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "A company wants to run containerized microservices on AWS with the LEAST operational overhead, without managing EC2 instances or Kubernetes control planes. Which option achieves this?",
    opts: [
      "Amazon EC2 with Docker installed manually",
      "Amazon ECS on EC2 launch type",
      "Amazon ECS or EKS with AWS Fargate",
      "Amazon EKS with self-managed node groups",
    ],
    ans: [2],
    exp: {
      correct: [
        "Amazon ECS or EKS with AWS Fargate -- Fargate is a serverless compute engine for containers. AWS manages all underlying infrastructure, so there are no EC2 instances or clusters to maintain.",
      ],
      incorrect: [
        "Amazon EC2 + Docker -- requires full server management including OS patching and scaling.",
        "Amazon ECS on EC2 -- requires managing the EC2 instances that form the ECS cluster.",
        "EKS on self-managed node groups -- highest operational overhead; you manage EC2 nodes, OS, and Kubernetes upgrades.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 2,
    q: "A developer is building an event-driven architecture where one component needs to broadcast events to multiple downstream services simultaneously. Which TWO AWS services are MOST appropriate? (Select TWO.)",
    opts: ["Amazon SQS", "Amazon SNS", "Amazon EventBridge", "Amazon MQ", "AWS Step Functions"],
    ans: [1, 2],
    exp: {
      correct: [
        "Amazon SNS -- a pub/sub messaging service that delivers messages to multiple subscribers simultaneously, including SQS queues, Lambda functions, HTTP endpoints, and email.",
        "Amazon EventBridge -- a serverless event bus that routes events from AWS services, SaaS apps, or custom apps to multiple targets, enabling event-driven fan-out architectures.",
      ],
      incorrect: [
        "Amazon SQS -- a queue service for point-to-point messaging; one consumer reads each message. Not natively a fan-out/broadcast service.",
        "Amazon MQ -- a managed message broker for ActiveMQ/RabbitMQ; used for migrating existing brokers, not cloud-native fan-out.",
        "AWS Step Functions -- orchestrates sequential workflows; not an event broadcasting service.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS service provides a managed Apache Hadoop and Spark framework for processing vast amounts of data using tools like Hive, Presto, and HBase?",
    opts: ["Amazon Redshift", "Amazon Athena", "Amazon EMR", "AWS Glue"],
    ans: [2],
    exp: {
      correct: [
        "Amazon EMR (Elastic MapReduce) -- provides a managed Hadoop ecosystem including Spark, Hive, HBase, Flink, and Presto for large-scale data processing.",
      ],
      incorrect: [
        "Amazon Redshift -- a columnar data warehouse, not a Hadoop framework.",
        "Amazon Athena -- a serverless SQL query service for S3; does not manage Hadoop/Spark clusters.",
        "AWS Glue -- a managed serverless ETL service; not a full Hadoop cluster management service.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS service allows you to run standard SQL queries directly against data stored in Amazon S3, without loading it into a database or managing any infrastructure?",
    opts: ["Amazon Redshift Spectrum", "Amazon Athena", "Amazon EMR", "AWS Glue DataBrew"],
    ans: [1],
    exp: {
      correct: [
        "Amazon Athena -- a serverless, interactive query service that analyzes data in S3 using standard SQL. There is no infrastructure to manage and you pay per query scanned.",
      ],
      incorrect: [
        "Amazon Redshift Spectrum -- extends Redshift to query S3 but requires an existing Redshift cluster.",
        "Amazon EMR -- can query S3 but requires provisioning and managing a cluster.",
        "AWS Glue DataBrew -- a visual data preparation tool for cleaning/transforming data, not a SQL query engine.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 2,
    q: "A global company wants to improve performance and availability of its dynamic web application for users worldwide while protecting against DDoS attacks. Which TWO AWS services should they combine? (Select TWO.)",
    opts: [
      "Amazon CloudFront",
      "AWS Global Accelerator",
      "Amazon Route 53",
      "AWS Shield Advanced",
      "AWS Direct Connect",
    ],
    ans: [0, 3],
    exp: {
      correct: [
        "Amazon CloudFront -- distributes content globally from edge locations to reduce latency; integrates natively with AWS Shield Advanced for DDoS protection.",
        "AWS Shield Advanced -- provides enhanced DDoS protection, real-time monitoring, and access to the AWS DDoS Response Team (DRT), especially when used with CloudFront.",
      ],
      incorrect: [
        "AWS Global Accelerator -- improves performance using the AWS backbone but is primarily for non-HTTP use cases and doesn't provide CDN caching.",
        "Amazon Route 53 -- provides global DNS routing but alone does not improve application performance or provide DDoS protection.",
        "AWS Direct Connect -- provides private network connectivity from on-premises to AWS; does not help with global user performance.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "A workload must run on EC2 for exactly 3 years, continuously, and the specific instance type and region cannot change. Which EC2 pricing option provides the MAXIMUM discount?",
    opts: [
      "On-Demand Instances",
      "Compute Savings Plans",
      "Standard Reserved Instances",
      "Convertible Reserved Instances",
    ],
    ans: [2],
    exp: {
      correct: [
        "Standard Reserved Instances -- provide the highest discount (up to 72%) for committing to a specific instance type, region, and 3-year term. Ideal for fixed, continuous, predictable workloads.",
      ],
      incorrect: [
        "On-Demand -- most flexible but most expensive; no discount for commitment.",
        "Compute Savings Plans -- flexible across instance types, regions, and compute services but offer a slightly lower discount than Standard RIs.",
        "Convertible Reserved Instances -- allow instance type changes mid-term but offer a lower discount than Standard RIs; flexibility is unnecessary here.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "A company needs to interconnect hundreds of VPCs across multiple AWS accounts and connect them to on-premises networks through a single centrally managed hub. Which AWS service is BEST suited?",
    opts: ["VPC Peering", "AWS Direct Connect", "AWS Transit Gateway", "AWS PrivateLink"],
    ans: [2],
    exp: {
      correct: [
        "AWS Transit Gateway -- acts as a hub-and-spoke network transit hub that interconnects VPCs, AWS accounts, and on-premises networks through a single gateway, greatly simplifying complex network topologies.",
      ],
      incorrect: [
        "VPC Peering -- connects two VPCs but is non-transitive and does not scale to hundreds of VPCs.",
        "AWS Direct Connect -- provides private connectivity from on-premises to AWS but doesn't manage inter-VPC routing at scale.",
        "AWS PrivateLink -- provides private access to services within AWS without internet traversal; not a hub-and-spoke WAN solution.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS service provides a managed message broker supporting industry-standard protocols such as JMS, AMQP, STOMP, and MQTT -- making it ideal for migrating existing on-premises message broker workloads?",
    opts: ["Amazon SQS", "Amazon SNS", "Amazon MQ", "Amazon Kinesis Data Streams"],
    ans: [2],
    exp: {
      correct: [
        "Amazon MQ -- a managed message broker service for Apache ActiveMQ and RabbitMQ that supports standard messaging protocols, ideal for lifting and shifting existing broker workloads to AWS.",
      ],
      incorrect: [
        "Amazon SQS -- a cloud-native queue service; does not support standard broker protocols like JMS or AMQP natively.",
        "Amazon SNS -- a pub/sub notification service; does not support JMS/AMQP protocols.",
        "Amazon Kinesis Data Streams -- a streaming data ingestion service; not a message broker replacement.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 2,
    q: "A company wants to migrate its VMware-based virtual machines from an on-premises data center to AWS with minimal changes. Which TWO AWS services or features support this type of migration? (Select TWO.)",
    opts: [
      "AWS Application Migration Service (AWS MGN)",
      "AWS Database Migration Service (AWS DMS)",
      "VM Import/Export",
      "AWS Snowcone",
      "AWS DataSync",
    ],
    ans: [0, 2],
    exp: {
      correct: [
        "AWS Application Migration Service (AWS MGN) -- the primary recommended service for lift-and-shift migrations of on-premises servers (including VMware VMs) to AWS with minimal downtime.",
        "VM Import/Export -- allows importing virtual machine images (VMware, Hyper-V, etc.) directly into Amazon EC2 as AMIs.",
      ],
      incorrect: [
        "AWS DMS -- migrates databases, not virtual machine images.",
        "AWS Snowcone -- a small edge computing and data transfer device; not a VM migration service.",
        "AWS DataSync -- transfers files and data between storage systems; does not migrate VMs.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS storage service provides a fully managed elastic NFS file system that can be simultaneously mounted by multiple EC2 instances across multiple Availability Zones?",
    opts: ["Amazon EBS", "Amazon S3", "Amazon EFS", "Amazon FSx for Windows File Server"],
    ans: [2],
    exp: {
      correct: [
        "Amazon EFS (Elastic File System) -- a fully managed NFS file system that scales automatically, supports thousands of concurrent connections, and can be mounted by EC2 instances across multiple AZs simultaneously.",
      ],
      incorrect: [
        "Amazon EBS -- block storage typically attached to a single EC2 instance; not designed for concurrent multi-AZ access.",
        "Amazon S3 -- object storage accessed via HTTP/HTTPS; not a mountable NFS file system.",
        "Amazon FSx for Windows File Server -- a managed Windows file system using SMB protocol, not NFS.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS service provides a fully managed graph database supporting Property Graph (Gremlin) and RDF (SPARQL) models, ideal for social networks, fraud detection, and recommendation engines?",
    opts: ["Amazon DynamoDB", "Amazon RDS for PostgreSQL", "Amazon Neptune", "Amazon Keyspaces"],
    ans: [2],
    exp: {
      correct: [
        "Amazon Neptune -- a fully managed graph database supporting Property Graph and RDF models, ideal for highly connected datasets like social networks, fraud detection, and knowledge graphs.",
      ],
      incorrect: [
        "Amazon DynamoDB -- a NoSQL key-value/document database; not a graph database.",
        "Amazon RDS for PostgreSQL -- a relational database; not optimized for graph traversal queries.",
        "Amazon Keyspaces -- a managed Apache Cassandra-compatible wide-column store; not a graph database.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "A company needs its EC2 instances in a private subnet to download software updates from the internet without allowing inbound connections from the internet. Which VPC resource should they configure?",
    opts: ["Internet Gateway", "VPC Peering Connection", "NAT Gateway", "AWS Direct Connect Gateway"],
    ans: [2],
    exp: {
      correct: [
        "NAT Gateway -- allows instances in private subnets to initiate outbound connections to the internet while preventing the internet from initiating inbound connections to those instances.",
      ],
      incorrect: [
        "Internet Gateway -- enables full bidirectional internet access for resources with public IPs; private subnet instances have no public IPs.",
        "VPC Peering -- connects two VPCs; does not provide internet access.",
        "AWS Direct Connect Gateway -- provides private connectivity from on-premises to AWS; does not route general internet traffic.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 2,
    q: "A retail company wants to add a product recommendation engine and a conversational chatbot for customer support to its e-commerce platform. Which TWO AWS AI/ML services are MOST directly applicable? (Select TWO.)",
    opts: ["Amazon Personalize", "Amazon Rekognition", "Amazon Lex", "Amazon Textract", "Amazon Translate"],
    ans: [0, 2],
    exp: {
      correct: [
        "Amazon Personalize -- a fully managed ML service for building real-time personalization and recommendation systems, using the same technology as Amazon.com.",
        "Amazon Lex -- a service for building conversational interfaces (chatbots) using voice and text, powered by the same deep learning as Alexa.",
      ],
      incorrect: [
        "Amazon Rekognition -- image and video analysis (face detection, object recognition); not for recommendations or chatbots.",
        "Amazon Textract -- extracts text and structured data from scanned documents; not for recommendations or chatbots.",
        "Amazon Translate -- a neural machine translation service; not for recommendations or chatbots.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS service allows developers to build, train, tune, and deploy machine learning models at scale using a fully managed infrastructure, without needing deep ML expertise to set up environments?",
    opts: ["Amazon Comprehend", "AWS DeepRacer", "Amazon SageMaker", "Amazon Rekognition"],
    ans: [2],
    exp: {
      correct: [
        "Amazon SageMaker -- a fully managed ML platform covering the entire workflow: data labeling, model building, training, tuning, deployment, and monitoring at scale.",
      ],
      incorrect: [
        "Amazon Comprehend -- a natural language processing service for text insights; not a general-purpose ML training and deployment platform.",
        "AWS DeepRacer -- an educational autonomous racing league for learning reinforcement learning; not for production ML.",
        "Amazon Rekognition -- a pre-trained image/video analysis service; does not provide custom model training infrastructure.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 1,
    q: "Which AWS service is a managed, serverless data integration service that makes it easy to discover, prepare, move, and integrate data from multiple sources using a visual ETL interface and a centralized data catalog?",
    opts: ["AWS Glue", "Amazon EMR", "AWS Data Pipeline", "Amazon Kinesis Data Analytics"],
    ans: [0],
    exp: {
      correct: [
        "AWS Glue -- a fully managed serverless ETL service that discovers data via the Glue Data Catalog, transforms it visually or with code, and loads it into data stores. No infrastructure to manage.",
      ],
      incorrect: [
        "Amazon EMR -- a managed Hadoop/Spark cluster; requires provisioning cluster resources.",
        "AWS Data Pipeline -- an older orchestration service for data movement; AWS Glue is the modern serverless replacement.",
        "Amazon Kinesis Data Analytics -- analyzes streaming data in real time; not a general ETL/integration service.",
      ],
    },
  },
  {
    domain: "Technology",
    multi: 2,
    q: "A company wants to improve application resilience by automatically routing traffic away from unhealthy endpoints. Which TWO AWS services natively support health-check-based automatic traffic routing? (Select TWO.)",
    opts: [
      "Amazon Route 53",
      "Elastic Load Balancing (ELB)",
      "AWS Direct Connect",
      "Amazon VPC",
      "AWS Global Accelerator",
    ],
    ans: [0, 1],
    exp: {
      correct: [
        "Amazon Route 53 -- supports health checks on endpoints and DNS failover routing policies that automatically redirect traffic away from unhealthy endpoints.",
        "Elastic Load Balancing (ELB) -- continuously monitors the health of registered targets (EC2 instances, containers, Lambda) and stops routing traffic to unhealthy ones automatically.",
      ],
      incorrect: [
        "AWS Direct Connect -- a dedicated network connectivity service; does not perform health-based traffic routing.",
        "Amazon VPC -- provides network isolation and routing; does not perform application-level health-check routing.",
        "AWS Global Accelerator -- routes to the nearest healthy endpoint but is less granular than Route 53 + ELB for this purpose.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "A company runs a fault-tolerant batch processing job every night for 4 hours. The job can be safely restarted if interrupted. Which EC2 purchasing option provides the LOWEST cost?",
    opts: ["On-Demand Instances", "Reserved Instances (1-year, No Upfront)", "Spot Instances", "Dedicated Hosts"],
    ans: [2],
    exp: {
      correct: [
        "Spot Instances -- offer up to 90% off On-Demand pricing. Since the workload is fault-tolerant and can be restarted if interrupted, it is ideal for Spot.",
      ],
      incorrect: [
        "On-Demand -- flexible but most expensive for this intermittent workload.",
        "Reserved Instances -- cost-effective only for continuous, steady-state workloads. A 4-hour/night job would not benefit enough to justify the commitment.",
        "Dedicated Hosts -- the most expensive option; for software license compliance, not cost savings.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 2,
    q: "Which TWO AWS Cost Management tools allow you to proactively SET LIMITS or ALERTS on spending, rather than simply analyzing past costs? (Select TWO.)",
    opts: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Cost and Usage Report (CUR)",
      "AWS Pricing Calculator",
      "AWS Billing Conductor",
    ],
    ans: [1, 4],
    exp: {
      correct: [
        "AWS Budgets -- allows you to set custom cost, usage, and reservation budgets with automatic alerts when thresholds are exceeded or forecast to be exceeded.",
        "AWS Billing Conductor -- allows you to create custom billing groups and pricing rules, proactively controlling how costs are allocated and presented across accounts.",
      ],
      incorrect: [
        "AWS Cost Explorer -- a historical analysis and forecasting tool; does not set spending limits.",
        "AWS Cost and Usage Report (CUR) -- provides the most detailed billing data but is purely a reporting/analysis tool.",
        "AWS Pricing Calculator -- estimates future costs before deployment; does not monitor or limit actual spending.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "Account A in AWS Organizations has 10 Reserved Instances (RIs) but only uses 6. Account B uses 8 On-Demand instances of the same type. Consolidated Billing is enabled. What is the outcome?",
    opts: [
      "Each account is billed separately; RIs only apply to the account that purchased them",
      "Account B receives no benefit from Account A's unused RIs",
      "Account B's matching On-Demand instances receive the RI discount for up to 4 instances",
      "Reserved Instances are invalidated when accounts are consolidated",
    ],
    ans: [2],
    exp: {
      correct: [
        "With Consolidated Billing, unused Reserved Instance hours are automatically shared across accounts in the organization. Account A has 4 unused RIs, so Account B's matching On-Demand instances receive the RI pricing for those 4 instances.",
      ],
      incorrect: [
        "Consolidated Billing does share RI benefits across accounts -- they are not siloed per account.",
        "Account B does benefit -- RI discount sharing is a key feature of Consolidated Billing.",
        "RIs are not invalidated by consolidation -- sharing them is a financial benefit of Organizations.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "Which AWS Support plan is the MINIMUM tier required to receive access to the full set of AWS Trusted Advisor checks, including all cost optimization and security checks?",
    opts: ["Basic", "Developer", "Business", "Enterprise On-Ramp"],
    ans: [2],
    exp: {
      correct: [
        "Business Support -- is the minimum plan that provides access to all Trusted Advisor checks (157+), including cost optimization, security, fault tolerance, performance, and service limits.",
      ],
      incorrect: [
        "Basic -- only provides access to 7 core Trusted Advisor checks.",
        "Developer -- also limited to a subset of Trusted Advisor checks; not the full set.",
        "Enterprise On-Ramp -- provides full access, but Business is the minimum tier that unlocks all checks.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "A company wants to reduce S3 storage costs by automatically moving objects to cheaper storage tiers as access frequency decreases, without writing manual lifecycle rules per object. Which S3 feature is BEST suited?",
    opts: ["S3 Lifecycle Policies", "S3 Intelligent-Tiering", "S3 Cross-Region Replication", "S3 Object Lock"],
    ans: [1],
    exp: {
      correct: [
        "S3 Intelligent-Tiering -- automatically moves objects between access tiers (Frequent, Infrequent, Archive Instant Access) based on actual access patterns with no retrieval fees and no operational overhead.",
      ],
      incorrect: [
        "S3 Lifecycle Policies -- can move objects to cheaper tiers but require manual configuration rules based on age, not actual access patterns.",
        "S3 Cross-Region Replication -- copies objects across buckets/regions for redundancy; does not optimize storage costs.",
        "S3 Object Lock -- prevents object deletion/modification for compliance; unrelated to cost optimization.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 2,
    q: "Which TWO factors directly incur data transfer CHARGES in AWS? (Select TWO.)",
    opts: [
      "Data transferred INTO AWS from the internet",
      "Data transferred OUT from AWS to the internet",
      "Data transferred between services within the same AWS Availability Zone",
      "Data transferred between AWS Regions",
      "The number of IAM users making API calls",
    ],
    ans: [1, 3],
    exp: {
      correct: [
        "Data transferred OUT from AWS to the internet -- outbound data transfer is charged per GB based on volume and destination.",
        "Data transferred between AWS Regions -- inter-region data transfer is charged at a per-GB rate that varies by source and destination region.",
      ],
      incorrect: [
        "Data IN from the internet to AWS -- inbound data transfer to AWS is free.",
        "Data transfer within the same AZ -- generally free between services in the same AZ.",
        "IAM user count -- has no effect on data transfer pricing.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "Which AWS service provides the most granular, line-by-line report of all AWS usage and costs that can be delivered to S3 and integrated with Amazon Athena or Redshift for custom business intelligence analysis?",
    opts: ["AWS Cost Explorer", "AWS Budgets", "AWS Cost and Usage Report (CUR)", "AWS Trusted Advisor"],
    ans: [2],
    exp: {
      correct: [
        "AWS Cost and Usage Report (CUR) -- provides the most comprehensive and granular billing data, delivered to S3. It can be queried with Athena, loaded into Redshift, or visualized with QuickSight for custom analysis.",
      ],
      incorrect: [
        "AWS Cost Explorer -- provides visual analytics and forecasting but is not a raw detailed export for custom pipelines.",
        "AWS Budgets -- sets spending alerts; does not provide raw line-item data exports.",
        "AWS Trusted Advisor -- makes best-practice recommendations; does not provide billing data exports.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "Which AWS tool helps a solutions architect estimate the monthly cost of a planned AWS deployment BEFORE provisioning any resources?",
    opts: ["AWS Cost Explorer", "AWS Trusted Advisor", "AWS Pricing Calculator", "AWS Cost and Usage Report"],
    ans: [2],
    exp: {
      correct: [
        "AWS Pricing Calculator -- a free web tool that allows customers to model their planned AWS architecture and estimate costs before deploying any resources. It covers all major AWS services.",
      ],
      incorrect: [
        "AWS Cost Explorer -- analyzes actual historical spending and provides forecasts, but requires resources to already be running.",
        "AWS Trusted Advisor -- provides recommendations on existing deployments; not a pre-deployment cost estimation tool.",
        "AWS Cost and Usage Report -- provides detailed billing data from existing usage; not a pre-deployment planning tool.",
      ],
    },
  },
  {
    domain: "Billing & Pricing",
    multi: 1,
    q: "Which AWS feature allows an organization to flag specific EC2 instances as 'savings plans commitments' that automatically apply a discounted rate across EC2, Lambda, and Fargate usage regardless of instance family, size, or region?",
    opts: [
      "Standard Reserved Instances",
      "Convertible Reserved Instances",
      "Compute Savings Plans",
      "EC2 Instance Savings Plans",
    ],
    ans: [2],
    exp: {
      correct: [
        "Compute Savings Plans -- offer up to 66% savings with maximum flexibility: they apply automatically across EC2 (any family, size, region), Lambda, and Fargate. You commit to a $/hour spend level for 1 or 3 years.",
      ],
      incorrect: [
        "Standard Reserved Instances -- locked to a specific instance type, region, and OS; do not apply to Lambda or Fargate.",
        "Convertible Reserved Instances -- allow instance family changes but are still EC2-only and region-specific.",
        "EC2 Instance Savings Plans -- apply to a specific instance family in a specific region; offer a higher discount than Compute SPs but less flexibility.",
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

export default function AWSCloudPractitioner({ onBack }: { onBack: () => void }) {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Set<number>[]>([]);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [seconds, setSeconds] = useState(90 * 60);
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
    const shuffled = buildShuffledExam(RAW_QUESTIONS);
    setQuestions(shuffled);
    setAnswers(shuffled.map(() => new Set()));
    setChecked(new Array(shuffled.length).fill(false));
    setExamStarted(true);
    setDone(false);
    setReview(false);
    setPaused(false);
    setCurrentQuestion(0);
    setFlagged(new Set());
    setSeconds(90 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const answeredCount = () => {
    return answers.filter((s, i) => s.size > 0 || checked[i]).length;
  };

  const pickOption = (optionIndex: number) => {
    if (checked[currentQuestion] || review || paused) return;

    const q = questions[currentQuestion];
    const newAnswers = [...answers];
    const sel = new Set(newAnswers[currentQuestion]);

    if (q.multi === 1) {
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
    if (next >= 0 && next < questions.length) {
      setCurrentQuestion(next);
    }
  };

  const toggleFlag = () => {
    if (paused) return;
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
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

  if (!examStarted) {
    return (
      <div className='relative min-h-screen'>
        <div
          className='fixed inset-0 bg-cover'
          style={{
            backgroundImage: "url(/bg.jpg)",
            backgroundPosition: "center 0%",
            backgroundAttachment: "fixed",
            filter: "brightness(1) saturate(1)",
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
            className='mb-8 text-base tracking-wide transition-colors hover:text-[#f2d8e8]'
            style={{ color: "#b89ab8" }}
          >
            ← Back to Dashboard
          </button>

          <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] border-l-4 border-l-[#7bc8ea] p-8 backdrop-blur-sm'>
            <div className='mb-8'>
              <span
                className='inline-block text-sm px-3 py-2 border border-[rgba(180,140,200,0.3)] bg-[rgba(10,5,20,0.6)] tracking-wider'
                style={{ color: "#c9a8e0" }}
              >
                CLF-C02
              </span>
              <h1
                className='text-4xl mt-4 mb-2 tracking-wider'
                style={{
                  color: "#f2d8e8",
                  textShadow: "2px 2px 0 #3a1040, 0 0 12px rgba(200,140,220,0.4)",
                }}
              >
                AWS Cloud Practitioner
              </h1>
              <p className='text-base tracking-wide mt-2' style={{ color: "#9a88b8" }}>
                A challenging practice exam to test your AWS Cloud Practitioner knowledge
              </p>
            </div>

            <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-6 mb-8'>
              <h2
                className='text-2xl mb-4 tracking-wide'
                style={{
                  color: "#ede0f5",
                  textShadow: "1px 1px 0 #3a1040",
                }}
              >
                Exam Details
              </h2>
              <div className='space-y-3 text-base tracking-wide' style={{ color: "#9a88b8" }}>
                <div className='flex items-start gap-3'>
                  <span style={{ color: "#7bc8ea" }}>•</span>
                  <span>49 questions</span>
                </div>
                <div className='flex items-start gap-3'>
                  <span style={{ color: "#7bc8ea" }}>•</span>
                  <span>90 minutes</span>
                </div>
                <div className='flex items-start gap-3'>
                  <span style={{ color: "#7bc8ea" }}>•</span>
                  <span>Passing score: 70%</span>
                </div>
                <div className='flex items-start gap-3'>
                  <span style={{ color: "#7bc8ea" }}>•</span>
                  <span>
                    Mix of single-select and multi-select questions across Cloud Concepts, Security & Compliance,
                    Technology, and Billing & Pricing
                  </span>
                </div>
                <div className='flex items-start gap-3'>
                  <span style={{ color: "#7bc8ea" }}>•</span>
                  <span>Questions and answers are shuffled each time</span>
                </div>
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

  if (done && !review) {
    const total = questions.length;
    let correct = 0;
    questions.forEach((q, i) => {
      if (q.ans.length === answers[i].size && q.ans.every((a) => answers[i].has(a))) {
        correct++;
      }
    });
    const pct = Math.round((correct / total) * 100);
    const passed = pct >= 70;
    const unanswered = answers.filter((s, i) => s.size === 0 && !checked[i]).length;
    const used = 90 * 60 - seconds;
    const mins = Math.floor(used / 60);
    const scs = used % 60;

    const domainScores: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0 };
      }
      domainScores[q.domain].total++;
      if (q.ans.length === answers[i].size && q.ans.every((a) => answers[i].has(a))) {
        domainScores[q.domain].correct++;
      }
    });

    return (
      <div className='relative min-h-screen'>
        <div
          className='fixed inset-0 bg-cover'
          style={{
            backgroundImage: "url(/bg.jpg)",
            backgroundPosition: "center 0%",
            backgroundAttachment: "fixed",
            filter: "brightness(1) saturate(1)",
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
          <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-8 backdrop-blur-sm text-center'>
            <div className='text-7xl font-bold mb-4' style={{ color: passed ? "#1D9E75" : "#c0392b" }}>
              {pct}%
            </div>
            <div className='text-2xl font-semibold mb-2' style={{ color: passed ? "#1D9E75" : "#c0392b" }}>
              {passed ? "PASS -- Excellent work!" : "FAIL -- Review your weak areas"}
            </div>
            <div className='text-base mb-8' style={{ color: "#9a88b8" }}>
              (passing score: 70%)
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4'>
                <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#9a88b8" }}>
                  Correct
                </div>
                <div className='text-3xl font-bold' style={{ color: "#1D9E75" }}>
                  {correct}
                </div>
              </div>
              <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4'>
                <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#9a88b8" }}>
                  Incorrect
                </div>
                <div className='text-3xl font-bold' style={{ color: "#c0392b" }}>
                  {total - correct - unanswered}
                </div>
              </div>
              <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4'>
                <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#9a88b8" }}>
                  Unanswered
                </div>
                <div className='text-3xl font-bold' style={{ color: "#ede0f5" }}>
                  {unanswered}
                </div>
              </div>
              <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4'>
                <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#9a88b8" }}>
                  Time used
                </div>
                <div className='text-3xl font-bold' style={{ color: "#ede0f5" }}>
                  {mins}:{String(scs).padStart(2, "0")}
                </div>
              </div>
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
                          style={{
                            width: `${domainPct}%`,
                            background: domainPct >= 70 ? "#1D9E75" : "#c0392b",
                          }}
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

  const q = questions[currentQuestion];
  const sel = answers[currentQuestion];
  const locked = checked[currentQuestion] || review;
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  const multi = q.multi > 1;

  return (
    <div className='relative min-h-screen'>
      <div
        className='fixed inset-0 bg-cover'
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundPosition: "center 0%",
          backgroundAttachment: "fixed",
          filter: "brightness(1) saturate(1)",
        }}
      />

      <div
        className='fixed inset-0'
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)",
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-8 max-w-5xl'>
        <div className='flex items-center justify-between mb-4 bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-4 backdrop-blur-sm'>
          <h2 className='text-xl tracking-wide' style={{ color: "#f2d8e8" }}>
            CLF-C02 Hard Practice Exam
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
                  setSeconds(90 * 60);
                }
              }}
              className='px-4 py-2 text-sm tracking-wide transition-all bg-[rgba(192,57,43,0.2)] hover:bg-[rgba(192,57,43,0.3)] border border-[rgba(192,57,43,0.5)]'
              style={{ color: "#f1948a" }}
            >
              Exit Exam
            </button>
          </div>
        </div>

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
            <div
              className='h-full transition-all'
              style={{
                width: `${progress}%`,
                background: "#1D9E75",
              }}
            />
          </div>
        </div>

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
            Review Mode -- all answers revealed with explanations
          </div>
        )}

        <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm mb-4'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3 flex-wrap'>
              <span className='text-xs uppercase tracking-wider' style={{ color: "#9a88b8" }}>
                Q{currentQuestion + 1}
              </span>
              <span
                className='text-xs px-3 py-1 border border-[rgba(180,140,200,0.3)] bg-[rgba(10,5,20,0.6)]'
                style={{ color: "#7bc8ea" }}
              >
                {q.domain}
              </span>
              {multi && (
                <span
                  className='text-xs px-3 py-1 border font-semibold'
                  style={{
                    background: "#fff3e0",
                    color: "#e65100",
                    borderColor: "#ffcc80",
                  }}
                >
                  Select {q.multi}
                </span>
              )}
            </div>
            <button
              onClick={toggleFlag}
              className='text-2xl transition-colors'
              style={{ color: flagged.has(currentQuestion) ? "#e67e22" : "#666" }}
            >
              {flagged.has(currentQuestion) ? "⚑" : "⚐"}
            </button>
          </div>

          <div className='text-base leading-relaxed mb-6' style={{ color: "#ede0f5" }}>
            {q.q}
          </div>

          {multi && (
            <div className='text-sm italic mb-4' style={{ color: "#9a88b8" }}>
              Select exactly {q.multi} answers.
            </div>
          )}

          <div className='space-y-3'>
            {q.opts.map((opt, i) => {
              let bgColor = "rgba(10,5,20,0.6)";
              let borderColor = "rgba(180,140,200,0.3)";
              let textColor = "#ede0f5";

              if (locked) {
                if (q.ans.includes(i) && sel.has(i)) {
                  bgColor = "rgba(29,158,117,0.2)";
                  borderColor = "#1D9E75";
                  textColor = "#b4f2d1";
                } else if (q.ans.includes(i) && !sel.has(i)) {
                  bgColor = "rgba(243,156,18,0.2)";
                  borderColor = "#f39c12";
                  textColor = "#f8c471";
                } else if (!q.ans.includes(i) && sel.has(i)) {
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
                  style={{
                    background: bgColor,
                    borderColor: borderColor,
                    color: textColor,
                  }}
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
              Check Answer (select {q.multi})
            </button>
          )}

          {locked && (
            <div className='mt-6 border border-[rgba(180,140,200,0.22)]'>
              <div
                className='px-4 py-2 text-xs uppercase tracking-wider font-semibold'
                style={{
                  background: "#1D9E75",
                  color: "#fff",
                }}
              >
                Explanation
              </div>
              <div
                className='p-4 text-sm leading-relaxed'
                style={{
                  background: "rgba(29,158,117,0.1)",
                  color: "#b4f2d1",
                }}
              >
                {q.exp.correct.map((exp, idx) => (
                  <div key={idx} className='mb-3'>
                    <span className='font-semibold' style={{ color: "#1D9E75" }}>
                      CORRECT:
                    </span>{" "}
                    {exp}
                  </div>
                ))}
                {q.exp.incorrect.map((exp, idx) => (
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
