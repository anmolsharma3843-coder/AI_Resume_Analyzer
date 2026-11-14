import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiFileText,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiShield,
  FiBarChart2,
  FiAward,
} from "react-icons/fi";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const features = [
    {
      icon: FiTarget,
      title: "Resume Analysis",
      description:
        "Analyze your resume against a job description and discover how well your profile matches the role.",
    },
    {
      icon: FiBarChart2,
      title: "Match Score",
      description:
        "Get an easy-to-understand compatibility score based on skills, experience, and job requirements.",
    },
    {
      icon: FiCheckCircle,
      title: "Skill Gap Detection",
      description:
        "Identify missing and partially matched skills so you know exactly where to improve.",
    },
    {
      icon: FiTrendingUp,
      title: "Improvement Suggestions",
      description:
        "Receive actionable suggestions to improve your resume and present your experience effectively.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description: "Upload your resume in PDF or DOCX format.",
    },
    {
      number: "02",
      title: "Add Job Description",
      description: "Paste the job description of the position you want.",
    },
    {
      number: "03",
      title: "Get AI Analysis",
      description: "Our AI evaluates your resume against the job requirements.",
    },
    {
      number: "04",
      title: "Improve Your Resume",
      description: "Review your results and follow personalized suggestions.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white">

        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
              <FiZap className="text-yellow-300" />
              AI-Powered Career Assistant
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Build a stronger resume.
              <span className="mt-2 block text-indigo-300">
                Get closer to your dream job.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Welcome to ResumeAI, your intelligent resume analysis
              platform. Understand how your resume matches a job
              description, identify skill gaps, and discover ways to
              improve your career profile.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-3 rounded-xl bg-indigo-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-1 hover:bg-indigo-400"
              >
                Analyze My Resume
                <FiArrowRight />
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                How It Works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-green-400" />
                PDF & DOCX Support
              </span>

              <span className="flex items-center gap-2">
                <FiShield className="text-green-400" />
                Secure Authentication
              </span>
            </div>
          </div>

          {/* Hero Preview Card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">

              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-300">Resume Analysis</p>
                  <h3 className="mt-1 text-xl font-bold">
                    Your Resume Report
                  </h3>
                </div>

                <div className="rounded-xl bg-indigo-400/20 p-3 text-indigo-200">
                  <FiFileText size={24} />
                </div>
              </div>

              <div className="mt-7 flex items-center gap-6">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[10px] border-indigo-400/30">
                  <div className="absolute inset-0 rotate-45 rounded-full border-[10px] border-transparent border-r-indigo-400 border-t-indigo-400" />

                  <div className="text-center">
                    <h2 className="text-3xl font-bold">85%</h2>
                    <p className="text-xs text-slate-300">Match Score</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-green-300">
                    Strong Match
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Example preview of how your resume analysis report
                    could look.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  ["Matched Skills", "12", "text-green-300"],
                  ["Partial Matches", "4", "text-yellow-300"],
                  ["Missing Skills", "2", "text-red-300"],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm text-slate-300">{label}</span>
                    <span className={`font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-center text-xs text-slate-400">
                Illustrative sample report — not a real analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome & Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div className="mb-10">
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">
            YOUR CAREER STARTS HERE
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {user?.name
              ? `Welcome back, ${user.name}!`
              : "Welcome to ResumeAI!"}
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-500 dark:text-gray-400">
            Take control of your job search. Understand your strengths,
            discover improvement opportunities, and prepare a resume
            that better communicates your qualifications.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-500/50 dark:hover:shadow-black/20"
              >
                <div className="mb-5 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/15 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-white py-20 transition-colors duration-300 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">
              SIMPLE PROCESS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              How ResumeAI Works
            </h2>

            <p className="mt-4 leading-7 text-slate-500 dark:text-gray-400">
              Four simple steps to understand your resume and make
              informed improvements.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                  {step.number}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-gray-400">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <FiArrowRight className="absolute right-0 top-5 hidden text-2xl text-indigo-200 dark:text-indigo-500/50 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-6 py-20 transition-colors duration-300 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-indigo-700 to-violet-700 px-6 py-14 text-center text-white shadow-xl sm:px-12">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <FiAward size={30} />
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to improve your resume?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-100">
            Start your analysis today. Discover how your skills align
            with your target job and find practical ways to improve.
          </p>

          <Link
            to="/analyze"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3.5 font-bold text-indigo-700 transition hover:-translate-y-1 hover:bg-indigo-50"
          >
            Get Started Now
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
              ResumeAI
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              Make your next career move with confidence.
            </p>
          </div>

          <p className="text-sm text-slate-400 dark:text-gray-500">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
