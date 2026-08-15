import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('Professional')
  const [generatedReply, setGeneratedReply] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const generateReply = async () => {

    if (!emailContent.trim()) {
      setError('Please paste an email first.')
      return
    }

    setError('')
    setIsLoading(true)

    try {

      // Backend API will go here, get the request from the backend using axios
      const response = await axios.post('https://email-reply-ai-backend.onrender.com/email/generate', {
        emailContent,
        tone
      })

      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))

    } catch (err) {

      setError('Something went wrong. Please try again.')
      console.error(err)

    } finally {
      setIsLoading(false)
    }
  }

  const copyReply = () => {
    navigator.clipboard.writeText(generatedReply)
  }

  return (

    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Navbar */}

      <nav className="border-b border-slate-800 bg-slate-950/90">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
              <span className="text-xl">✉</span>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                MailGen
              </h1>

              <p className="text-xs text-slate-500">
                AI Email Assistant
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">

            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

            <span className="text-xs font-medium text-emerald-400">
              Gemini Ready
            </span>

          </div>

        </div>

      </nav>


      {/* Hero */}

      <main className="mx-auto max-w-6xl px-6 py-12">

        <div className="mx-auto mb-10 max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-400">

            ✨ Powered by Gemini

          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">

            Write better emails.

            <span className="block text-indigo-400">
              In seconds.
            </span>

          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-400">

            Paste an email, choose a tone, and let AI
            craft a natural response for you.

          </p>

        </div>


        {/* Main Grid */}

        <div className="grid gap-6 lg:grid-cols-2">


          {/* Input Card */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20">

            <div className="p-6">

              <div className="mb-5 flex items-start justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    Email Content
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Paste the email you received
                  </p>

                </div>

                <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-400">

                  {emailContent.length} chars

                </span>

              </div>


              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste the email you want to reply to..."
                className="h-64 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-relaxed text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />


              {/* Tone */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Response Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="select w-full border-slate-700 bg-slate-950 text-slate-200 focus:border-indigo-500"
                >

                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Formal</option>
                  <option>Casual</option>
                  <option>Apologetic</option>
                  <option>Confident</option>

                </select>

              </div>


              {/* Error */}

              {error && (

                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

                  {error}

                </div>

              )}


              {/* Generate */}

              <button
                onClick={generateReply}
                disabled={isLoading}
                className="btn mt-5 h-12 w-full border-0 bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-600/50"
              >

                {isLoading ? (

                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Generating...
                  </>

                ) : (

                  <>
                    ✨ Generate Reply
                  </>

                )}

              </button>

            </div>

          </div>


          {/* Output Card */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20">

            <div className="p-6">

              <div className="mb-5 flex items-start justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    Generated Reply
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your AI-generated response
                  </p>

                </div>

                {generatedReply && (

                  <button
                    onClick={copyReply}
                    className="btn btn-sm border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Copy
                  </button>

                )}

              </div>


              {/* Output */}

              <div className="min-h-64 rounded-xl border border-slate-800 bg-slate-950 p-5">

                {isLoading ? (

                  <div className="flex h-56 flex-col items-center justify-center">

                    <span className="loading loading-ring loading-lg text-indigo-500"></span>

                    <p className="mt-4 text-sm text-slate-500">
                      Crafting your reply...
                    </p>

                  </div>

                ) : generatedReply ? (

                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {generatedReply}
                  </p>

                ) : (

                  <div className="flex h-56 flex-col items-center justify-center text-center">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl">

                      ✨

                    </div>

                    <p className="font-medium text-slate-400">
                      Your reply will appear here
                    </p>

                    <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-600">
                      Paste an email and click Generate Reply to create an AI-powered response.
                    </p>

                  </div>

                )}

              </div>


              {generatedReply && (

                <div className="mt-4 flex gap-3">

                  <button
                    onClick={copyReply}
                    className="btn flex-1 border-0 bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    Copy Reply
                  </button>

                  <button
                    onClick={generateReply}
                    disabled={isLoading}
                    className="btn border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Regenerate
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* Footer */}

        <p className="mt-8 text-center text-xs text-slate-600">

          AI-generated responses should be reviewed before sending.

        </p>

      </main>

    </div>
  )
}

export default App