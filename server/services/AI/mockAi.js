export async function analyzeWithMock({
  resumeText,
  jobDescription,
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const resume = resumeText.toLowerCase();
  const jd = jobDescription.toLowerCase();

  // Requirements that the mock analyzer knows how to evaluate.
  const requirementCatalog = [
    {
      requirement: "React.js application development",
      category: "skill",
      jdKeywords: ["react", "react.js", "react js"],
      resumeKeywords: ["react", "react.js", "react js"],
      recommendation: "Mention React projects and the features you developed.",
    },
    {
      requirement: "State management using Redux or MobX",
      category: "skill",
      jdKeywords: ["redux", "mobx"],
      resumeKeywords: ["redux", "mobx"],
      recommendation: "Describe how you used Redux or MobX to manage application state.",
    },
    {
      requirement: "HTML5",
      category: "skill",
      jdKeywords: ["html5", "html"],
      resumeKeywords: ["html5", "html"],
      recommendation: "Add HTML5 to your technical skills if you have experience with it.",
    },
    {
      requirement: "CSS3",
      category: "skill",
      jdKeywords: ["css3", "css"],
      resumeKeywords: ["css3", "css", "tailwind"],
      partialKeywords: ["tailwind"],
      recommendation: "Mention your CSS experience and responsive styling projects.",
    },
    {
      requirement: "JavaScript ES6+",
      category: "skill",
      jdKeywords: ["javascript", "es6"],
      resumeKeywords: ["javascript", "es6"],
      recommendation: "Include JavaScript ES6+ projects and relevant features.",
    },
    {
      requirement: "jQuery",
      category: "skill",
      jdKeywords: ["jquery", "jQuery"],
      resumeKeywords: ["jquery"],
      recommendation: "Add jQuery projects if you have practical experience.",
    },
    {
      requirement: "Bootstrap",
      category: "skill",
      jdKeywords: ["bootstrap"],
      resumeKeywords: ["bootstrap"],
      recommendation: "Mention Bootstrap experience if you have used it.",
    },
    {
      requirement: "AJAX",
      category: "skill",
      jdKeywords: ["ajax"],
      resumeKeywords: ["ajax"],
      recommendation: "Describe how you have used AJAX for asynchronous requests.",
    },
    {
      requirement: "ASP.NET Core / ASP.NET MVC",
      category: "skill",
      jdKeywords: ["asp.net core", "asp.net mvc", "asp.net"],
      resumeKeywords: ["asp.net core", "asp.net mvc", "asp.net"],
      recommendation: "Add ASP.NET experience only if you have actually worked with it.",
    },
    {
      requirement: "Git and GitHub workflows",
      category: "skill",
      jdKeywords: ["git", "github", "git repositories"],
      resumeKeywords: ["git", "github"],
      recommendation: "Describe your Git workflow, commits, branches, and GitHub projects.",
    },
    {
      requirement: "Unit testing",
      category: "skill",
      jdKeywords: ["unit test", "unit testing", "unit tests"],
      resumeKeywords: ["unit test", "unit testing", "jest", "vitest"],
      recommendation: "Add unit testing experience and testing tools if applicable.",
    },
    {
      requirement: "Code reviews",
      category: "responsibility",
      jdKeywords: ["code review", "code reviews"],
      resumeKeywords: ["code review", "code reviews"],
      recommendation: "Mention code reviews, pull requests, or collaborative code improvement.",
    },
    {
      requirement: "Cross-functional team collaboration",
      category: "soft_skill",
      jdKeywords: ["cross-functional", "collaborate", "collaboration"],
      resumeKeywords: ["cross-functional", "collaborate", "collaboration"],
      recommendation: "Include examples of working with developers, designers, or other teams.",
    },
    {
      requirement: "Frontend troubleshooting",
      category: "responsibility",
      jdKeywords: ["troubleshoot", "troubleshooting", "debugging"],
      resumeKeywords: ["troubleshoot", "troubleshooting", "debugging"],
      partialKeywords: ["problem-solver", "problem solver"],
      recommendation: "Describe frontend bugs you diagnosed and how you resolved them.",
    },
    {
      requirement: "Bachelor's degree in a related field",
      category: "education",
      jdKeywords: ["bachelor", "bachelor's degree", "degree"],
      resumeKeywords: [
        "bca",
        "bachelor of computer applications",
        "bachelor of science",
        "b.tech",
        "btech",
        "bachelor of technology",
        "bachelor of computer science",
      ],
      recommendation: "Include your relevant bachelor's degree in the education section.",
    },
  ];

  // Evaluate only requirements actually mentioned in the job description.
  const relevantRequirements = requirementCatalog.filter((item) =>
    item.jdKeywords.some((keyword) => jd.includes(keyword))
  );

  const evaluatedRequirements = relevantRequirements.map((item) => {
    const matchedKeyword = item.resumeKeywords.find((keyword) =>
      resume.includes(keyword)
    );

    const partialKeyword = item.partialKeywords?.find((keyword) =>
      resume.includes(keyword)
    );

    let status = "missing";
    let evidence = "";

    if (matchedKeyword) {
      status = "met";
      evidence = `Resume contains "${matchedKeyword}".`;
    } else if (partialKeyword) {
      status = "partially_met";
      evidence = `Related evidence found: "${partialKeyword}".`;
    }

    return {
      requirement: item.requirement,
      category: item.category,
      status,
      evidence,
      recommendation:
        status === "met" ? "" : item.recommendation,
    };
  });

  const metRequirements = evaluatedRequirements.filter(
    (item) => item.status === "met"
  );

  const partialRequirements = evaluatedRequirements.filter(
    (item) => item.status === "partially_met"
  );

  const missingRequirements = evaluatedRequirements.filter(
    (item) => item.status === "missing"
  );

  // Full match = 1 point, partial match = 0.5 point.
  const totalScore = evaluatedRequirements.length
    ? Math.round(
        ((metRequirements.length +
          partialRequirements.length * 0.5) /
          evaluatedRequirements.length) *
          100
      )
    : 0;

  return {
    score: totalScore,

    requirements: evaluatedRequirements,

    matchedRequirements: metRequirements.map(
      (item) => item.requirement
    ),

    partialRequirements: partialRequirements.map(
      (item) => item.requirement
    ),

    missingRequirements: missingRequirements.map(
      (item) => item.requirement
    ),

    strengths: metRequirements.map(
      (item) => `Your resume demonstrates ${item.requirement}.`
    ),

    weaknesses: missingRequirements.map(
      (item) => `No supporting evidence found for ${item.requirement}.`
    ),

    suggestions: [
      ...partialRequirements.map((item) => item.recommendation),
      ...missingRequirements.map((item) => item.recommendation),
      "Add measurable achievements where accurate.",
      "Include relevant project examples to demonstrate your skills.",
      "Never add skills or experience that you do not actually have.",
    ],

    summary: evaluatedRequirements.length
      ? `Your resume matches ${metRequirements.length} out of ${evaluatedRequirements.length} evaluated requirements, with ${partialRequirements.length} partial matches.`
      : "No supported requirements were identified in this job description.",
  };
}
