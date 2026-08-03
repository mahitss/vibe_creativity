export default function SignInPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="h-10 w-10 mx-auto rounded-xl bg-neutral-100 text-neutral-950 font-bold font-mono text-base flex items-center justify-center">
            O
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Sign in to OMNIA</h1>
          <p className="text-xs text-neutral-400">Autonomous Creator Operating System</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">Email</label>
            <input
              type="email"
              placeholder="creator@example.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs py-2.5 rounded-lg transition shadow-md"
          >
            Continue with Email
          </button>
        </form>
      </div>
    </div>
  );
}
