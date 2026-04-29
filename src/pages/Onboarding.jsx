import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Send, Check } from 'lucide-react'
import { cn } from '../utils/helpers'

const INITIAL_MESSAGES = [
  { id: 1, text: "Welcome to BizOS! I'm your AI assistant. I'll help you set up your workspace in just a minute.", isAi: true },
  { id: 2, text: "First, what's the primary industry of your business?", isAi: true, 
    options: ["Retail / E-commerce", "Manufacturing", "Services", "Technology"] }
]

const Onboarding = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [step, setStep] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()
  const { completeOnboarding } = useAuthStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleNextStep = (answerText) => {
    // Add user message
    const newMsg = { id: Date.now(), text: answerText, isAi: false }
    setMessages(prev => [...prev, newMsg])
    
    // Simulate AI typing
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      const nextStep = step + 1
      setStep(nextStep)
      
      if (nextStep === 2) {
        setMessages(prev => [...prev, {
          id: Date.now(), text: "Great! How many employees do you currently have?", isAi: true,
          options: ["Under 10", "10-50", "50-200", "200+"]
        }])
      } else if (nextStep === 3) {
        setMessages(prev => [...prev, {
          id: Date.now(), text: "Got it. Which modules would you like to start with? (I recommend starting with all)", isAi: true,
          options: ["All Modules (Recommended)", "Inventory & Sales only", "HR & Payroll only"]
        }])
      } else if (nextStep >= 4) {
        setMessages(prev => [...prev, {
          id: Date.now(), text: "Perfect! I'm configuring your personalized dashboard now.", isAi: true
        }])
        
        // Start completion sequence
        setTimeout(() => {
          setIsCompleting(true)
          setTimeout(() => {
            completeOnboarding()
            navigate('/dashboard')
          }, 3000)
        }, 1500)
      }
    }, 1200)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return
    handleNextStep(inputValue)
    setInputValue('')
  }

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border-4 border-primary rounded-2xl animate-ping opacity-20"></div>
          <span className="text-white font-bold text-5xl">B</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 animate-pulse">Your workspace is ready</h2>
        <p className="text-[#A1A1AA] mb-8">Launching BizOS intelligence...</p>
        <div className="w-64 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-[progress_3s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
        </div>
      </div>
    )
  }

  const currentOptions = messages[messages.length - 1]?.options

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row page-transition">
      {/* Left side */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#1A1A1A] p-8 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 border-2 border-primary rounded-2xl animate-ping opacity-20"></div>
            <div className="absolute inset-[-10px] border border-primary rounded-3xl animate-ping opacity-10" style={{ animationDelay: '0.5s'}}></div>
            <span className="text-white font-bold text-4xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Setting up BizOS</h1>
          <div className="flex items-center gap-2 mt-4">
            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Step {step} of 3
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1/4 -left-1/4 w-full h-full rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Right side - Chat */}
      <div className="w-full md:w-2/3 flex flex-col h-screen max-h-screen relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex w-full animate-reveal", msg.isAi ? "justify-start" : "justify-end")}>
              <div className={cn("flex max-w-[80%] gap-3", msg.isAi ? "flex-row" : "flex-row-reverse")}>
                {msg.isAi && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                )}
                <div className={cn(
                  "p-4 rounded-2xl text-sm md:text-base",
                  msg.isAi 
                    ? "bg-[#1A1A1A] text-white rounded-tl-none border border-white/5" 
                    : "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20"
                )}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex w-full justify-start animate-reveal">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1A1A] text-white rounded-tl-none border border-white/5 flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 bg-[#0A0A0A] border-t border-[#1A1A1A]">
          {currentOptions && !isTyping ? (
            <div className="flex flex-wrap gap-2 mb-4 animate-reveal">
              {currentOptions.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleNextStep(opt)}
                  className="px-4 py-2 rounded-xl bg-[#1A1A1A] text-white border border-white/10 hover:bg-primary hover:border-primary transition-all text-sm font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSend} className="relative max-w-3xl mx-auto">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={isTyping || currentOptions}
                placeholder={currentOptions ? "Select an option above" : "Type your answer..."}
                className="w-full bg-[#1A1A1A] text-white border border-white/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping || currentOptions}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
              >
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  )
}

export default Onboarding
