import { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react'
const ZoomedCtx = createContext(false)

const T = {
  bg:       '#f7f6f3',
  surface:  '#ffffff',
  border:   'rgba(0,0,0,0.08)',
  borderMd: 'rgba(0,0,0,0.13)',
  text:     '#111111',
  muted:    '#6b6b6b',
  hint:     '#aaaaaa',
  accent:   '#1a1a1a',
  tag:      '#f0efec',
  tagText:  '#444444',
  radius:   '12px',
  radiusSm: '8px',
  radiusLg: '20px',
}

const NAV = [
  { id: 'about',          label: 'About' },
  { id: 'projects',       label: 'Projects' },
  { id: 'experience',     label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills',         label: 'Skills' },
  { id: 'dashboards',     label: 'Dashboards' },
  { id: 'contact',        label: 'Contact' },
]

const DATA = {
  name:      'Shishir Kumar Vallapuneni',
  title:     'Data Engineer & ML Engineer',
  location:  'Atlanta, GA',
  email:     'vallapunenishishir@gmail.com',
  linkedin:  'https://linkedin.com/in/shishir-kumar-vallapuneni',
  github:    'https://github.com/Shishirr11',
  resumeUrl:     'https://drive.google.com/file/d/1iPIy2IPNK_iPaO2edlIn50H5QoG7_3tf/view?usp=sharing',
  resumeDownload: 'https://drive.google.com/uc?export=download&id=1iPIy2IPNK_iPaO2edlIn50H5QoG7_3tf',,

  bio: `I'm a data engineer and ML enthusiast who finds genuine joy in building systems that turn raw, chaotic data into something clean, meaningful, and fast. Pipelines, models, warehouses. I care about every layer of the stack, and I care about getting it right.
I think in flows. Whether it's designing how data moves or how it's understood and stored. Great work starts with great values. I lead with respect, integrity, and the discipline in every situation. My father taught me something simple that stuck: treat every person with the dignity they deserve.
Currently sharpening my craft at Georgia State University, always building, always learning (Graduating May 2026)`,

  ps: `The Macbook scene and animation isn't made with AI, Its ThreeJs a framework and its actually interesting (learnt it from Bruno simon - awesome guy) try it out whenever you have some free time.`,

  projects: [
    {
      id: 1,
      title: 'FailSight — Founders Intelligence',
      desc: 'Aggregates 2,767 failed startups + 30,000+ live opportunities : Grants.gov, SBIR, NSF, OpenAlex into a DuckDB lakehouse. Two-stage TF-IDF and 768-dim semantic search. AI-powered idea validator and risk score. (The number of records in the live link are cut down due to free - tier hosting limits, will figure it out soon)',
      tags: ['Python', 'FastAPI', 'DuckDB', 'React', 'TF-IDF', 'sentence-transformers', 'Groq', 'Tailwind'],
      live: 'https://fail-sight.vercel.app/',
      github: 'https://github.com/Shishir11/Fail-sight',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
        {
      id: 2,
      title: 'WeCode — Collaborative Coding',
      desc: 'Real-time LeetCode practice for groups. Monaco editor, live room presence, in-room chat, group voting on problem sets, and code execution via each user\'s own LeetCode session. Node.js + Socket.io backend with Redis persistence.',
      tags: ['Node.js', 'TypeScript', 'Socket.io', 'React', 'Redis', 'Monaco Editor'],
      live: 'https://we-code-dh8m2r7mk-shishirr11s-projects.vercel.app',
      github: 'https://github.com/Shishirr11/We-Code',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
    {
      id: 5,
      title: 'Retail Merger Lakehouse Pipeline',
      desc: 'Unifying parent and child retail company datasets into a Medallion architecture (Bronze : Silver : Gold) on Databricks and Delta Lake. Python ingestors stage 150+ CSV deliveries to S3, Spark jobs write Delta tables with audit fields, and 8000+ monthly aggregates power BI dashboards.',
      tags: ['Databricks', 'Delta Lake', 'PySpark', 'AWS S3', 'Python', 'SQL', 'Power BI'],
      live: null,
      github: 'https://github.com/Shishirr11/Retail-Merger-Lakehouse-Pipeline',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
    {
      id: 4,
      title: 'SQL Data Warehouse',
      desc: 'SQL Server warehouse consolidating CRM and ERP extracts: 60K+ sales records, 18K+ customers, 397 products into a Gold layer star schema. Full Medallion ETL with Bulk Insert staging, stored procedures with runtime logging, and QA testing achieving perfect data accuracy. (Learnt from Data with Baara)',
      tags: ['SQL Server', 'T-SQL', 'ETL', 'Star Schema', 'Tableau', 'Power BI'],
      live: null,
      github: 'https://github.com/Shishirr11/SQL-Data-Warehouse',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
    {
      id: 3,
      title: 'Padel Match Analytics Pipeline',
      desc: 'Watch-and-analyse pipeline for padel. YOLOv8 detects and tracks players; TrackNet-style heatmap model tracks the ball across 3-frame rolling windows. Homography maps pixel coordinates to a flat court plane. Outputs annotated video + speed/distance analytics.',
      tags: ['Python', 'PyTorch', 'YOLOv8', 'OpenCV', 'TrackNet', 'Homography'],
      live: null,
      github: 'https://github.com/Shishirr11/Padel-Game-Analytics-using-player-tracking',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
    {
      id: 6,
      title: 'Image Stitching — Global, APAP & KR',
      desc: 'Panorama maker for two overlapping photos. SIFT/ORB detection, ratio-test filtering, RANSAC homography, then three parallel warp strategies: global (one H matrix), APAP (locally adaptive warp), and a custom KR pipeline. Three blended outputs for comparison.',
      tags: ['Python', 'OpenCV', 'NumPy', 'SciPy', 'SIFT', 'RANSAC', 'Homography'],
      live: null,
      github: 'https://github.com/Shishirr11/Image-Stitching',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
    {
      id: 7,
      title: 'IDS for Cryptographic Protocol Misuse',
      desc: 'Flow-level network IDS predicting four misuse flags per flow: MITM, SSL stripping, weak cert, and encrypted malware. Trains Random Forest, LightGBM, XGBoost, and a deep MLP on CICIDS2017 + Darknet flow data.',
      tags: ['Python', 'TensorFlow', 'XGBoost', 'LightGBM', 'scikit-learn', 'PyShark', 'Pandas'],
      live: null,
      github: 'https://github.com/Shishirr11/IDS-for-cryptographic-protocol-misuses',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },
    {
      id: 8,
      title: 'Tweet Sentiment — BERT vs RoBERTa',
      desc: 'Compares BERT and RoBERTa on 41K COVID-19 tweets collapsed into 3 sentiment classes. Pipeline includes emoji/URL stripping, hashtag cleaning, and RandomOverSampler balancing. Both models fine-tuned for 4 epochs with full F1 evaluation.',
      tags: ['Python', 'TensorFlow', 'HuggingFace', 'BERT', 'RoBERTa', 'NLP', 'scikit-learn'],
      live: null,
      github: 'https://github.com/Shishirr11/Tweet-Analysis-Corona-Virus-Tagged-Data-Analysis-',
      preview: 'https://opengraph.githubassets.com/Shishirr11',
    },

  ],

  timeline: [
    {
      id: 'e1', type: 'job',
      year: 'Jan 2025 — Present',
      title: 'Teaching & Research Associate',
      org: 'Georgia State University',
      location: 'Atlanta, GA',
      description: 'As a Graduate Research & Teaching Assistant at Georgia State University, I run hands-on lab sessions in Java, C, SQL, and shell scripting while mentoring 90+ students through capstone projects. Architected a Python CV pipeline using PyTorch, YOLOv8, and TrackNet processing 10TB+ video data with 34% improvement in player/ball tracking accuracy towards the research in Sports Analytics while handling everything from data collection and labeling to cleaning, model evaluation, and visual reporting of movement patterns. Engineered 2D court projection solutions reducing positional errors by 23% across 100+ test cases.',
      skills: ['PyTorch', 'YOLOv8', 'TrackNet', 'Java', 'SQL', 'Python'],
    },
    {
      id: 'e2', type: 'job',
      year: 'Jul 2023 — Dec 2023',
      title: 'Software Engineering Intern',
      org: 'NowFloats',
      location: 'Hyderabad, India',
      description: 'Built Java backend services using Spring Boot processing 500K+ daily transactions. Implemented load-balancing and automated data integrity checks via CI/CD pipelines reducing the API latency by 23% and achieving a guaranteed uptime while cutting infra costs 18% annually. Resolved 40+ production UI issues across Boost360 and BizHQ while building ETL pipelines for real-time data ingestion, worked on database schema designs to support clean, scalable data storage. I also optimized SQL queries to improve data retrieval speed and wrote advanced SQL workflows for consistent data capture and persistence',
      skills: ['Java', 'Spring Boot', 'SQL', 'CI/CD', 'HTML/CSS', 'JavaScript'],
    },
    {
      id: 'e3', type: 'job',
      year: 'Aug 2022 — Jan 2023',
      title: 'Research Intern',
      org: 'DigiClinics',
      location: 'Hyderabad, India',
      description: 'As a Research Assistant, I designed and trained a YOLOv5-based deep learning model for blood cell detection and classification, reaching 87% accuracy by incorporating feature extraction techniques inspired by VGG16 and region proposal refinements from RPN. I built and managed the full data pipeline, from raw collection and expert annotation on a biweekly cycle to structured dataset expansion and quality control ensuring the model always trained on clean, reliable data. To keep the model sharp over time, I applied continual learning strategies including replay buffers, layer freezing, and monthly retraining cycles to adapt to shifting data distributions without sacrificing past performance.',
      skills: ['YOLOv5', 'Deep Learning', 'Python', 'Computer Vision', 'VGG16'],
    },
    {
      id: 'edu1', type: 'edu',
      year: 'Aug 2024 — May 2026',
      title: 'MS, Computer Science',
      org: 'Georgia State University',
      location: 'Atlanta, GA',
      description: 'CGPA 3.86/4.0. Relevant coursework: Advanced Machine Learning, Cryptography, Computational Intelligence, Data Mining, Cloud Computing. Research focus on sports analytics and computer vision pipelines using YOLOv8 and TrackNet.',
      skills: ['Machine Learning', 'Data Mining', 'Cloud Computing', 'Cryptography'],
    },
    {
      id: 'edu2', type: 'edu',
      year: 'Jul 2020 — May 2024',
      title: 'BTech, CS — AI & ML',
      org: 'Keshav Memorial Institute of Technology',
      location: 'Hyderabad, India',
      description: 'CGPA 3.37/4.0 (8.27/10). Specialization in Artificial Intelligence and Machine Learning. Core team member of Recurse Tech Club. Winner of Smart India Hackathon 2022. Runner-up GRIET 24-Hour Hackathon (Agro-Tech track).',
      skills: ['Algorithms', 'Data Structures', 'Machine Learning', 'AI'],
    },
  ],

  certs: [
    {
      id: 1,
      title: 'Microsoft Certified: Fabric Data Engineer Associate',
      issuer: 'Microsoft',
      year: 'Mar 2026',
      desc: 'Data Engineering, Data Pipeline, Lakehouse, Eventstreams, KQL, T-SQL, and Spark-SQL on Microsoft Fabric. Valid until March 2027.',
      color: '#EDF3FF',
      icon: '⊞',
      credUrl: 'https://learn.microsoft.com/en-us/users/shishirkumarvallapuneni-0896/credentials/7bc0e06a13bc3e46?ref=https%3A%2F%2Fwww.linkedin.com%2F',
    },
    {
      id: 2,
      title: 'SnowPro Associate: Platform',
      issuer: 'Snowflake',
      year: 'Apr 2026',
      desc: 'Data governance, data modeling, and the complete Snowflake data engineering certification learning path. Valid until April 2028.',
      color: '#E8F4FD',
      icon: '❄',
      credUrl: 'http://achieve.snowflake.com/707b2b90-96ff-42c0-9d2e-d2fd79afe36b#acc.ToUnYdxC',
    },
    {
      id: 3,
      title: 'Databricks Fundamentals Accreditation',
      issuer: 'Databricks Academy',
      year: 'Apr 2026',
      desc: 'Lakehouse architecture, Delta Lake, Apache Spark, and Databricks platform fundamentals.',
      color: '#FFF0E6',
      icon: '◆',
      credUrl: 'https://drive.google.com/file/d/11aQU-1AX0GlY6nwvEDBnxDp86tJY2Zic/view?usp=sharing',
    },
    {
      id: 4,
      title: 'Data Engineer Associate',
      issuer: 'DataCamp',
      year: 'Nov 2025',
      desc: 'EDA, data management, stream processing, ETL pipelines, and modern data stack tooling.',
      color: '#F0FDF4',
      icon: '▲',
      credUrl: 'https://drive.google.com/file/d/1mJEVT8-TMe00WctqDTUhTfSsM0EacSZH/view?usp=sharing',
    },
    {
      id: 5,
      title: 'AI Engineer for Data Scientists Associate',
      issuer: 'DataCamp',
      year: 'Nov 2025',
      desc: 'AI engineering concepts, LLM integration, and applied ML for data scientists.',
      color: '#FEF3E2',
      icon: '◎',
      credUrl: 'https://drive.google.com/file/d/17qBL9pF2S04Ndr2PfeGoZkL8bf499NjZ/view?usp=sharing',
    },
    {
      id: 6,
      title: 'Data Engineering Foundations by Astronomer',
      issuer: 'LinkedIn Learning',
      year: 'Jan 2026',
      desc: 'Apache Airflow, data engineering principles, Python, and data governance.',
      color: '#F1EFE8',
      icon: '⬡',
      credUrl: 'https://drive.google.com/file/d/1iCrrrrypeFCKc7xDJ-wOsLn_Rf9DmX7f/view?usp=sharing',
    },
    {
      id: 7,
      title: 'Docker Foundations Professional Certificate',
      issuer: 'LinkedIn Learning',
      year: 'Mar 2026',
      desc: 'Containerization, Docker products, and CI/CD integration.',
      color: '#FFF1F2',
      icon: '⬢',
      credUrl: 'https://drive.google.com/file/d/1Ty-iif5yUDaSKGbkYJhntLbuUpaLJmgf/view?usp=sharing',
    },
    {
      id: 8,
      title: 'Amazon ML Summer School',
      issuer: 'Amazon',
      year: 'Nov 2023',
      desc: 'Supervised Learning, Deep Neural Networks, Dimensionality Reduction, Probabilistic Graphical Models, Sequential Learning, Causal Inference, and Reinforcement Learning. 14% acceptance rate in India.',
      color: '#FEF3E2',
      icon: '★',
      credUrl: 'https://drive.google.com/file/d/1EjiHlRmAhOY5bvW8WFghpU6Z_55xy2w8/view?usp=sharing',
    },
  ],

  skills: {
    'Languages':          ['Python', 'SQL', 'Java', 'Scala', 'JavaScript', 'C++', 'R', 'HTML/CSS', 'Flutter'],
    'Data Engineering':   ['Apache Spark', 'PySpark', 'Airflow', 'dbt', 'Kafka', 'Delta Lake', 'ETL/ELT Pipelines', 'Data Modeling', 'Data Warehousing'],
    'Cloud & Platforms':  ['Databricks', 'Snowflake', 'AWS S3', 'Azure Data Factory', 'Microsoft Fabric', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
    'Databases':          ['MySQL', 'PostgreSQL', 'DuckDB', 'MongoDB', 'Redis', 'BigQuery'],
    'ML & AI':            ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'LightGBM', 'HuggingFace', 'YOLOv8', 'TrackNet', 'sentence-transformers', 'MLflow'],
    'Analytics & BI':     ['Tableau', 'Power BI', 'Pandas', 'NumPy', 'Matplotlib', 'Excel'],
    'Web & APIs':         ['React', 'FastAPI', 'Spring Boot', 'REST APIs', 'Node.js', 'Socket.io', 'Three.js', 'Vite'],
  },

  dashboards: [
    {
      id: 1,
      title: 'Human Resources Dashboard',
      desc: 'HR analytics dashboard surfacing workforce headcount, attrition rates, department breakdowns, and hiring trends — designed to give HR teams a single-screen view of people metrics (Learnt from Data With Baara)',
      thumb: 'https://public.tableau.com/static/images/HR/HRSummaryDashboard_17756848675520/HRSummay/1.png',
      url: 'https://public.tableau.com/app/profile/shishir.vallapuneni/viz/HRSummaryDashboard_17756848675520/HRSummay',
    },
    {
      id: 2,
      title: 'Sales & Customer Dashboards',
      desc: 'Dual-view dashboard tracking sales performance and customer behaviour: revenue trends, top products, regional breakdowns, and customer acquisition metrics built in Tableau (Learnt from Data With Baara)',
      thumb: 'https://public.tableau.com/static/images/Sa/SalesCustomerDashboards_17756925108110/SalesDashboard/1.png',
      url: 'https://public.tableau.com/app/profile/shishir.vallapuneni/viz/SalesCustomerDashboards_17756925108110/SalesDashboard',
    },
    {
        id: 3,
        title: 'State Sales Targets',
        desc: 'Geographic breakdown of sales targets vs actuals across US states spot which regions are hitting quota and where the gaps are, with state level drill-down in Tableau. (Learnt from Mo Chen)',
        thumb: 'https://public.tableau.com/static/images/St/StateTargets_17767364624140/Dashboard1/1.png',
        url: 'https://public.tableau.com/app/profile/shishir.vallapuneni/viz/StateTargets_17767364624140/Dashboard1',
    },
    {
        id: 4,
        title: 'British Airways Reviews',
        desc: 'Customer review analysis for British Airways sentiment breakdown, rating distributions across cabin class, route, and traveller type, built to surface where the airline wins and loses (Learnt from Mo Chen)',
        thumb: 'https://public.tableau.com/static/images/Br/BritishAirwaysReviews_17767369851230/Dashboard1/1.png',
        url: 'https://public.tableau.com/app/profile/shishir.vallapuneni/viz/BritishAirwaysReviews_17767369851230/Dashboard1',
    },
  ],
}

function SectionWrapper({ children, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      padding: '36px 52px 28px',
      overflowY: 'auto', overflowX: 'hidden',
      boxSizing: 'border-box', ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '13px', letterSpacing: '2.5px', textTransform: 'uppercase',
      color: T.hint, marginBottom: '22px', fontWeight: 600,
    }}>
      {children}
    </div>
  )
}

function Tag({ children, small }) {
  return (
    <span style={{
      background: T.tag, color: T.tagText,
      borderRadius: '100px', padding: small ? '3px 9px' : '4px 11px',
      fontSize: small ? '10px' : '11px', fontWeight: 500,
      display: 'inline-block', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

function About({ goTo }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      padding: '28px 48px 32px',
      boxSizing: 'border-box',
      overflowY: 'auto',
    }}>
      <div style={{
        width: '100px', height: '100px', borderRadius: '50%',
        background: T.tag, border: `1px solid ${T.border}`,
        overflow: 'hidden', flexShrink: 0, marginBottom: '22px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '32px', color: T.hint,
      }}>
        <img src="/Profile.jpeg" alt="Shishir"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>

      <h1 style={{
        fontSize: '30px', fontWeight: 700, color: T.text,
        margin: '0 0 6px', letterSpacing: '-0.8px', textAlign: 'center',
      }}>
        {DATA.name}
      </h1>
      <p style={{
        fontSize: '16px', color: T.muted, margin: '0 0 8px', textAlign: 'center',
      }}>
        {DATA.title}
      </p>
      <p style={{
        fontSize: '13px', color: T.hint, margin: '0 0 18px', textAlign: 'center',
        letterSpacing: '0.3px',
      }}>
        Georgia State University · Atlanta, GA
      </p>

      <p style={{
        fontSize: '14px', color: T.muted, lineHeight: '1.85',
        maxWidth: '560px', textAlign: 'center',
        margin: '3px 0 10px', whiteSpace: 'pre-line',
      }}>
        {DATA.bio}
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '42px' }}>
        {[
          { label: 'LinkedIn ↗', url: DATA.linkedin },
          { label: 'GitHub ↗',   url: DATA.github },
          { label: 'Resume ↗',   url: DATA.resumeUrl },
        ].map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noreferrer" style={{
            padding: '10px 22px', borderRadius: T.radiusSm,
            border: `0.5px solid ${T.borderMd}`,
            fontSize: '14px', fontWeight: 600, color: T.text,
            textDecoration: 'none', background: T.surface,
            transition: 'background 0.15s, border-color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = T.tag; e.currentTarget.style.borderColor = T.accent }}
            onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = T.borderMd }}
          >{label}</a>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: '18px',
        fontSize: '11px', color: T.hint, fontStyle: 'italic',
        maxWidth: '520px', textAlign: 'center', lineHeight: 1.6, padding: '0 2px',
      }}>
        ps; {DATA.ps}
      </div>
    </div>
  )
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: T.surface,
        border: `0.5px solid ${hov ? T.borderMd : T.border}`,
        borderRadius: T.radius, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        width: '300px', minWidth: '280px', maxWidth: '300px',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
    >
      <div style={{
        height: '120px', background: T.tag,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `0.5px solid ${T.border}`, fontSize: '28px', color: T.hint, flexShrink: 0,
      }}>
        {p.preview ? <img src={p.preview} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '◻'}
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex:1 }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: T.text, lineHeight: 1.35 }}>{p.title}</div>
        <p style={{ fontSize: '14px', color: T.muted, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
          {p.tags.map(t => <Tag key={t} small>{t}</Tag>)}
        </div>
        <div style={{ display: 'flex', gap: '12px', paddingTop: '10px', borderTop: `0.5px solid ${T.border}`, marginTop: 'auto' }}>
          {p.live && (
            <a
  href={p.live}
  target="_blank"
  rel="noreferrer"
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 18px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 700,
    textDecoration: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  }}
>
  ↗ Live
</a>
          )}
          {p.github && (
<a
  href={p.github}
  target="_blank"
  rel="noreferrer"
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 18px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 700,
    textDecoration: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  }}
>
  ⌥ GitHub
</a>
          )}
          
        </div>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <SectionWrapper>
      <SectionLabel>Projects</SectionLabel>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent:"center",
        alignContent: 'flex-start',
      }}>
        {DATA.projects.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </SectionWrapper>
  )
}

function TimelineModal({ item, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }} onClick={onClose}>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.surface,
          borderRadius: '20px',
          border: `0.5px solid ${T.border}`,
          padding: '24px 20px 28px',
          width: '100%',
          maxWidth: '480px',
          height: '50vh',
          overflowY: 'auto',
          boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
          animation: 'popIn 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <div style={{
              fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: item.type === 'job' ? T.accent : '#888', marginBottom: '4px', fontWeight: 700,
            }}>
              {/* {item.type === 'job' ? 'Experience' : 'Education'} · {item.year} */}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{item.title}</div>
            <div style={{ fontSize: '13px', color: T.muted, marginTop: '3px' }}>{item.org} · {item.location}</div>
          </div>
          <button onClick={onClose} style={{
            background: T.tag, border: 'none', borderRadius: '50%',
            width: '28px', height: '28px', flexShrink: 0, cursor: 'pointer',
            fontSize: '16px', color: T.muted,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        <p style={{ fontSize: '13px', color: T.muted, lineHeight: 1.75, margin: '0 0 16px' }}>
          {item.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.skills.map(s => <Tag key={s} small>{s}</Tag>)}
        </div>
      </div>
    </div>
  )
}

function Experience() {
  const [selected, setSelected] = useState(null)
  const jobs = DATA.timeline.filter(t => t.type === 'job')
  const edus = DATA.timeline.filter(t => t.type === 'edu')

  function Column({ items, label, dotColor }) {
    return (
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: T.hint, marginBottom: '20px', fontWeight: 700 }}>
          {label}
        </div>
        {items.map((item, i) => (
          <div key={item.id} style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '14px' }}>
              <div
                onClick={() => setSelected(item)}
                style={{
                  width: '11px', height: '11px', borderRadius: '50%',
                  background: dotColor, flexShrink: 0, cursor: 'pointer',
                  marginTop: '5px', transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.7)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              {i < items.length - 1 && (
                <div style={{ width: '1px', flex: 1, background: T.border, margin: '5px 0' }} />
              )}
            </div>
            <div
              onClick={() => setSelected(item)}
              style={{
                paddingBottom: '18px', cursor: 'pointer',
                padding: '3px 8px 18px', marginLeft: '-8px',
                borderRadius: T.radiusSm, transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.tag}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: '12px', color: T.hint, marginBottom: '3px' }}>{item.year}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: T.text }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: T.muted }}>{item.org}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      padding: '40px 52px', boxSizing: 'border-box',
      overflowY: 'auto',
    }}>
      <div style={{ width: '100%', height : "100%",maxWidth: '700px', maxheight:'500px',margin: '0 auto' }}>
        <SectionLabel>Experience & Education</SectionLabel>
        <div style={{ display: 'flex', gap: '48px' }}>
          <Column items={jobs} label="Work Experience" dotColor={T.accent} />
          <div style={{ width: '0.5px', background: T.border, alignSelf: 'stretch' }} />
          <Column items={edus} label="Education" dotColor="#999" />
        </div>
        <div style={{ marginTop: '20px', fontSize: '14px', color: T.hint }}>Click any item for full details</div>
      </div>
      {selected && <TimelineModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function CertModal({ cert, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.surface, borderRadius: T.radiusLg,
        border: `0.5px solid ${T.border}`,
        padding: '28px', maxWidth: '400px', width: '100%',
        boxShadow: '0 12px 48px rgba(0,0,0,0.14)', textAlign: 'center',
      }}>
        <div style={{
          width: '100px', height: '100px', borderRadius: '13px',
          background: cert.color, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '22px', margin: '0 auto 12px',
        }}>{cert.icon}</div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: T.text, marginBottom: '3px', lineHeight: 1.4 }}>{cert.title}</div>
        <div style={{ fontSize: '11px', color: T.muted, marginBottom: '12px' }}>{cert.issuer} · {cert.year}</div>
        <p style={{ fontSize: '12px', color: T.muted, lineHeight: 1.7, margin: '0 0 18px' }}>{cert.desc}</p>
        <a href={cert.credUrl} target="_blank" rel="noreferrer" style={{
          display: 'inline-block', padding: '9px 20px',
          background: T.accent, color: '#fff', borderRadius: T.radiusSm,
          fontSize: '11px', fontWeight: 700, textDecoration: 'none',
        }}>View Credential ↗</a>
        <button onClick={onClose} style={{
          display: 'block', margin: '12px auto 0', background: 'none',
          border: 'none', fontSize: '11px', color: T.hint, cursor: 'pointer',
        }}>Close</button>
      </div>
    </div>
  )
}

function Certifications() {
  const [selected, setSelected] = useState(null)
  return (
    <SectionWrapper>
      <SectionLabel>Certifications</SectionLabel>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
        gap: '11px',
      }}>
        {DATA.certs.map(c => (
          <div key={c.id} onClick={() => setSelected(c)} style={{
            background: T.surface, border: `0.5px solid ${T.border}`,
            borderRadius: T.radius, padding: '16px 12px',
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center', gap: '8px',
            transition: 'transform 0.15s, border-color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = T.borderMd }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = T.border }}
          >
            <div style={{
              width: '120px', height: '100px', borderRadius: '10px',
              background: c.color, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '18px',
            }}>{c.icon}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: T.text, lineHeight: 1.35 }}>{c.title}</div>
            <div style={{ fontSize: '10px', color: T.muted }}>{c.issuer} · {c.year}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '12px', fontSize: '10px', color: T.hint }}>Click any badge to view the credential</div>
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </SectionWrapper>
  )
}

function Skills() {
  const colors = ['#1a1a1a', '#185FA5', '#2d7a4f', '#7a3d2d', '#5a2d7a', '#0F6E56', '#993C1D']
  return (
    <SectionWrapper>
      <SectionLabel>Skills</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(DATA.skills).map(([cat, skills], i) => (
          <div key={cat}>
            <div style={{
              fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase',
              color: colors[i % colors.length], marginBottom: '8px', fontWeight: 700,
            }}>{cat}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map(skill => (
                <span key={skill} style={{
                  padding: '5px 12px', background: T.surface,
                  border: `0.5px solid ${T.borderMd}`, borderRadius: '100px',
                  fontSize: '14px', fontWeight: 500, color: T.text,
                  cursor: 'default', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.target.style.background = T.accent; e.target.style.color = '#fff'; e.target.style.borderColor = T.accent }}
                  onMouseLeave={e => { e.target.style.background = T.surface; e.target.style.color = T.text; e.target.style.borderColor = T.borderMd }}
                >{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function DashCard({ d }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: T.surface, border: `0.5px solid ${hov ? T.borderMd : T.border}`,
        borderRadius: T.radius, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{
        height: '120px', background: T.tag,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `0.5px solid ${T.border}`, flexDirection: 'column', gap: '6px',
      }}>
        {d.thumb
          ? <img src={d.thumb} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <>
              <div style={{ fontSize: '22px', color: T.hint }}>◫</div>
              <div style={{ fontSize: '9px', color: T.hint, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Tableau Public</div>
            </>
        }
      </div>
      <div style={{ padding: '13px 15px', flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: T.text }}>{d.title}</div>
        <p style={{ fontSize: '11px', color: T.muted, lineHeight: 1.6, margin: 0, flex: 1 }}>{d.desc}</p>
        <a href={d.url} target="_blank" rel="noreferrer" style={{
          fontSize: '11px', fontWeight: 700, color: T.accent, textDecoration: 'none',
          marginTop: '8px', paddingTop: '9px', borderTop: `0.5px solid ${T.border}`,
        }}>View on Tableau Public ↗</a>
      </div>
    </div>
  )
}

function Dashboards() {
  return (
    <SectionWrapper>
      <SectionLabel>Tableau Dashboards</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '11px' }}>
        {DATA.dashboards.map(d => <DashCard key={d.id} d={d} />)}
      </div>
      <div style={{ marginTop: '12px', fontSize: '10px', color: T.hint }}>
        Update DATA.dashboards with your Tableau Public links and thumbnail images.
      </div>
    </SectionWrapper>
  )
}

function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const send = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mjgjabjn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      padding: '40px 52px', boxSizing: 'border-box',
      overflowY: 'auto',
    }}>
      <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>
      <SectionLabel>Contact</SectionLabel>
      <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', maxWidth: '380px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: T.text, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
            Let's talk.
          </h2>
          <p style={{ fontSize: '14px', color: T.muted, margin: '0 0 22px', lineHeight: 1.7 }}>
            Open to full-time roles in data engineering, ML engineering, and software engineering. I'll get back to you as soon as possible.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { key: 'name', label: 'Name', type: 'text', ph: 'Name' },
              { key: 'email', label: 'Email', type: 'email', ph: 'Email' },
            ].map(({ key, label, type, ph }) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: '13px', color: T.muted, marginBottom: '6px', fontWeight: 600 }}>{label}</label>
                <input type={type} placeholder={ph} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: '100%', padding: '11px 14px', boxSizing: 'border-box',
                    border: `0.5px solid ${T.borderMd}`, borderRadius: T.radiusSm,
                    background: T.surface, fontSize: '14px', color: T.text,
                    outline: 'none', fontFamily: 'inherit',
                  }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: T.muted, marginBottom: '6px', fontWeight: 600 }}>Message</label>
              <textarea placeholder="Lets connect and work together...." rows={4} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  width: '100%', padding: '11px 14px', boxSizing: 'border-box',
                  border: `0.5px solid ${T.borderMd}`, borderRadius: T.radiusSm,
                  background: T.surface, fontSize: '14px', color: T.text,
                  outline: 'none', fontFamily: 'inherit', resize: 'vertical',
                }}
              />
            </div>
            <button
              onClick={status === 'error' ? () => setStatus('idle') : send}
              disabled={status === 'sending' || status === 'sent'}
              style={{
                padding: '12px 24px',
                background: status === 'sent' ? '#2d7a4f' : status === 'error' ? '#c0392b' : T.accent,
                color: '#fff', border: 'none', borderRadius: T.radiusSm,
                fontSize: '14px', fontWeight: 700,
                cursor: (status === 'idle' || status === 'error') ? 'pointer' : 'default',
                transition: 'background 0.2s',
              }}
            >
              {status === 'idle' ? 'Send Message ↗' : status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message sent!' : 'Error — click to retry'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '4px', minWidth: '170px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: T.hint, marginBottom: '8px', fontWeight: 600 }}>Email</div>
            <a href={`mailto:${DATA.email}`} style={{ fontSize: '15px', fontWeight: 600, color: T.text, textDecoration: 'none' }}>{DATA.email}</a>
          </div>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: T.hint, marginBottom: '12px', fontWeight: 600 }}>Find me on</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {[
                { label: 'LinkedIn', url: DATA.linkedin },
                { label: 'GitHub',   url: DATA.github },
              ].map(({ label, url }) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" style={{
                  padding: '11px 20px', background: T.surface,
                  border: `0.5px solid ${T.borderMd}`, borderRadius: T.radiusSm,
                  fontSize: '13px', fontWeight: 600, color: T.text,
                  textDecoration: 'none', transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = T.tag}
                  onMouseLeave={e => e.currentTarget.style.background = T.surface}
                >{label} ↗</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: T.hint, marginBottom: '12px', fontWeight: 600 }}>Resume</div>
            <div style={{ display: 'flex', gap: '7px' }}>
              <a href={DATA.resumeUrl} target="_blank" rel="noreferrer" style={{
                padding: '11px 20px', background: T.surface,
                border: `0.5px solid ${T.borderMd}`, borderRadius: T.radiusSm,
                fontSize: '13px', fontWeight: 600, color: T.text, textDecoration: 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = T.tag}
                onMouseLeave={e => e.currentTarget.style.background = T.surface}
              >View ↗</a>
              <a href={DATA.resumeDownload} target="_blank" rel="noreferrer" style={{
                padding: '11px 20px', background: T.accent,
                borderRadius: T.radiusSm, fontSize: '13px', fontWeight: 700,
                color: '#fff', textDecoration: 'none',
              }}>Download ↓</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

const SECTIONS = {
  about:          About,
  projects:       Projects,
  experience:     Experience,
  certifications: Certifications,
  skills:         Skills,
  dashboards:     Dashboards,
  contact:        Contact,
}

export default function Portfolio({ fullscreen, onClose, isZoomed = false }) {
  const [activeIdx, setActiveIdx]     = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animKey, setAnimKey]         = useState(0)

  const goTo = useCallback((nextIdx) => {
    if (isAnimating || nextIdx === activeIdx || nextIdx < 0 || nextIdx >= NAV.length) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIdx(nextIdx)
      setAnimKey(k => k + 1)
      setIsAnimating(false)
    }, 350)
  }, [activeIdx, isAnimating])

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') goTo(activeIdx + 1)
      if (e.key === 'ArrowLeft')  goTo(activeIdx - 1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [activeIdx, goTo])

  const ActiveSection = SECTIONS[NAV[activeIdx].id]

  return (
    <ZoomedCtx.Provider value={isZoomed}>
    <div style={{
      width: '100%', height: '100%',
      minHeight: fullscreen ? '100vh' : undefined,
      background: T.bg,
      fontFamily: "'SF Pro Display','Helvetica Neue','Segoe UI',system-ui,sans-serif",
      color: T.text, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sec-enter { animation: slideIn 0.35s ease forwards; }
        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 3px; }
        input:focus, textarea:focus { border-color: rgba(0,0,0,0.3) !important; }
      `}</style>

      <div style={{
        height: '70px',
        background: 'rgba(247,246,243,0.96)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `0.5px solid ${T.border}`,
        display: 'flex', alignItems: 'center',
        padding: '0 18px', gap: '6px', flexShrink: 0,
      }}>
        {fullscreen && (
          <button onClick={onClose} style={{
            background: 'none', border: `0.5px solid ${T.border}`,
            borderRadius: T.radiusSm, padding: '3px 10px',
            fontSize: '13px', color: T.muted, cursor: 'pointer', marginRight: '6px',
          }}>Scene</button>
        )}
        <nav style={{ display: 'flex', gap: '1px', flex: 1, overflowX: 'auto' }}>
          {NAV.map((n, i) => (
            <button key={n.id} onClick={() => goTo(i)} style={{
              background: activeIdx === i ? T.accent : 'transparent',
              color: activeIdx === i ? '#fff' : T.muted,
              border: 'none',
              borderRadius: T.radiusSm, padding: '7px 15px',
              fontSize: '14px', fontWeight: activeIdx === i ? 700 : 500,
              cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}>{n.label}</button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', paddingLeft: '12px', borderLeft: `0.5px solid ${T.border}` }}>
          {NAV.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{
              width: i === activeIdx ? '14px' : '5px',
              height: '5px', borderRadius: '3px',
              background: i === activeIdx ? T.accent : T.borderMd,
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'stretch' }}>

        <button
          onClick={() => goTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 10,
            width: '40px', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: activeIdx === 0 ? 'default' : 'pointer',
            opacity: activeIdx === 0 ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          aria-label="Previous section"
        >
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: '0.5px solid rgba(0,0,0,0.13)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f0efec'; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.transition = 'all 0.15s' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6.5 1.5L3 5l3.5 3.5" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <div style={{
          flex: 1, overflow: 'hidden', position: 'relative',
          opacity: isAnimating ? 0 : 1,
          transition: 'opacity 0.35s cubic-bezier(0.25,0.1,0.1,1)',
        }}>
          <div key={animKey} className="sec-enter" style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          }}>
            {activeIdx === 0
              ? <ActiveSection goTo={goTo} />
              : <ActiveSection />
            }
          </div>
        </div>

        <button
          onClick={() => goTo(activeIdx + 1)}
          disabled={activeIdx === NAV.length - 1}
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 10,
            width: '40px', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: activeIdx === NAV.length - 1 ? 'default' : 'pointer',
            opacity: activeIdx === NAV.length - 1 ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          aria-label="Next section"
        >
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: '0.5px solid rgba(0,0,0,0.13)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f0efec'; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.transition = 'all 0.15s' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

      </div>
    </div>
    </ZoomedCtx.Provider>
  )
}
