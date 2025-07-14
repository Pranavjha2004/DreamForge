import { useEffect, useState } from 'react';
import { BackgroundLines } from "../../components/ui/background-lines";
import { LoaderThree } from "../../components/ui/loader";
import axios from 'axios';

const PromptToImg = () => {
  const placeholderPrompts = [
"A futuristic city under a neon sky 🌆🌌",
"An astronaut riding a unicorn through space 🦄🚀",
"Cyberpunk samurai standing in the rain 🌧️⚔️",
"A cozy cottage in an enchanted forest 🏡🌲✨",
"A dragon flying over a medieval kingdom 🐉🏰",
"A robot barista serving coffee in 2050 🤖☕",
"A fantasy castle floating on clouds ☁️🏯",
"A steampunk inventor in their workshop ⚙️🧪",
"A mystical desert with glowing pyramids 🏜️🔺",
"Portrait of a cat dressed like a king 😺👑",
"Alien landscape with bioluminescent trees 👽🌳✨",
"Post-apocalyptic warrior with neon weapons 💥💡"
];

const [placeholder, setPlaceholder] = useState('');
const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);

const ApiKey = import.meta.env.VITE_PROMPT_TO_IMG_API_KEY;

useEffect(() => {
  const typingSpeed = 50;

  const interval = setInterval(() => {
    const currentPrompt = placeholderPrompts[currentPromptIndex];
    setPlaceholder(currentPrompt.slice(0, charIndex + 1));
    setCharIndex((prev) => prev + 1);

    if (charIndex >= currentPrompt.length) {
      clearInterval(interval);
      setTimeout(() => {
        setCharIndex(0);
        setCurrentPromptIndex((prev) => (prev + 1) % placeholderPrompts.length);
      }, 2500); // wait before switching to the next prompt
    }
  }, typingSpeed);

  return () => clearInterval(interval);
}, [charIndex, currentPromptIndex]);

  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const promptInput = (e) => {
    setPrompt(e.target.value);
  };

  const generateImage = async (promptText) => {
    setLoading(true);
    setErrorMsg('');
    setImageUrl('');

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
        {
          inputs: promptText,
          parameters: {
            negative_prompt: '',
            guidance_scale: 7.5,
            num_inference_steps: 30,
          },
        },
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${ApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'image/png',
          },
        }
      );

      const imageObjectUrl = URL.createObjectURL(response.data);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      if (error.response?.data instanceof Blob) {
        const errorText = await error.response.data.text();
        console.error('API Error:', errorText);
        setErrorMsg('API error: ' + errorText);
      } else {
        console.error('Unexpected Error:', error.message);
        setErrorMsg('Image generation failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = () => {
    if (prompt.trim() === '') return;
    generateImage(prompt);
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto bg-gray-100">
      <BackgroundLines className="flex flex-col items-center w-full px-4 gap-7 pb-10">
        <h2 className="relative bg-clip-text mt-20 text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-3xl md:text-5xl lg:text-7xl font-sans py-1 font-bold tracking-tight">
          DREAMFORGE
        </h2>

        {/* Prompt input */}
        <div className="relative w-full max-w-xl p-[6px] rounded-[2rem] bg-[radial-gradient(circle,_rgba(51,166,212,1)_0%,_rgba(87,199,133,1)_50%,_rgba(237,221,83,1)_100%)] flex justify-center items-center">
          <input
            onChange={promptInput}
            value={prompt}
            className="w-full px-4 py-4 rounded-l-[2rem] outline-none bg-white font-bold text-gray-700 text-sm sm:text-base"
            type="text"
            placeholder={placeholder}
          />
          <div
            onClick={handleGenerateImage}
            className="px-4 sm:px-6 py-4 bg-amber-200 rounded-r-[2rem] font-bold cursor-pointer hover:bg-amber-300 transition text-gray-800 text-sm sm:text-base"
          >
            Generate
          </div>
        </div>

        {/* Output section */}
        <div className="relative w-full max-w-md px-4 py-5 rounded-2xl mt-6 flex flex-col items-center mx-auto text-zinc-100 gap-5 border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl transition duration-500 ease-in-out hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
  {loading ? (
    <LoaderThree />
  ) : imageUrl ? (
    <>
      <img
        className="w-full max-w-[320px] max-h-[500px] h-auto rounded-xl shadow-lg object-contain mx-auto transition-transform duration-300 hover:scale-105"
        src={imageUrl}
        alt="Generated"
      />
      <a
        href={imageUrl}
        download="generated-image.jpg"
        className="relative inline-block px-6 py-2 text-white font-semibold text-sm rounded-full transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-300 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-300 blur opacity-70 group-hover:opacity-100 transition duration-1000 rounded-full"></span>
        <span className="relative z-10">Download</span>
      </a>
    </>
  ) : (
    <p className="text-zinc-400 font-medium text-center px-3 text-sm italic animate-pulse">
      {errorMsg || '🪄 Your generated image will magically appear here.'}
    </p>
  )}
</div>

      </BackgroundLines>
    </div>
  );
};

export default PromptToImg;
