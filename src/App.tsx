import React, { useState } from 'react';
import Header from './components/Header';
import VoiceSection from './components/VoiceSection';
import VibeSection from './components/VibeSection';
import ScriptSection from './components/ScriptSection';
import Footer from './components/Footer';

// 扩展 HTMLAudioElement 类型以包含自定义 dataset 属性
interface CustomAudioElement extends HTMLAudioElement {
  dataset: DOMStringMap & {
    voice?: string;
    vibe?: string;
  };
}

const App: React.FC = () => {
  // 开发者模式状态
  const [devMode, setDevMode] = useState<boolean>(false);
  // 音频状态
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioInstance, setAudioInstance] = useState<CustomAudioElement | null>(null);

  // 选择的语音
  const [selectedVoice, setSelectedVoice] = useState<string>('Coral');

  // 处理Voice切换
  const handleVoiceChange = (voice: string) => {
    setSelectedVoice(voice);
    // 如果正在播放，停止播放并清除音频
    if (isPlaying && audioInstance) {
      audioInstance.pause();
      setIsPlaying(false);
    }
    setAudioUrl(null);
    setAudioInstance(null);
  };

  // 选择的语气
  const [selectedVibe, setSelectedVibe] = useState<string>('Friendly');

  // 语气文本
  const [vibeText, setVibeText] = useState<string>(
    `Affect/personality: A cheerful guide

Tone: Friendly, clear, and reassuring, creating a calm atmosphere and making the listener feel confident and comfortable.

Pronunciation: Clear, articulate, and steady, ensuring each instruction is easily understood while maintaining a natural, conversational flow.

Pause: Brief, purposeful pauses after key instructions (e.g., "cross the street" and "turn right") to allow time for the listener to process the information and follow along.

Emotion: Warm and supportive, conveying empathy and care, ensuring the listener feels guided and safe throughout the journey.`
  );

  // 默认脚本文本
  const defaultScript = `Hello! I'll help you get to your favorite coffee shop. Let's begin!

Start by walking straight ahead for about 20 steps. When you reach the crosswalk, wait for the signal, then cross to your left.

Continue walking straight for about 30 steps. You'll pass a bakery on your right.

When you reach the next corner, turn right. Your coffee shop will be just ahead on the left.

Enjoy your coffee! Let me know if you need help on your way back.`;

  // 脚本文本
  const [script, setScript] = useState<string>(defaultScript);

  // 队列状态监控
  const [queueStatus, setQueueStatus] = useState<{ queue_size: number; max_queue_size: number } | null>(null);

  // 获取队列状态
  const fetchQueueStatus = async () => {
    try {
      const response = await fetch('/api/queue-size');
      if (response.ok) {
        const data = await response.json();
        setQueueStatus(data);
      }
    } catch (err) {
      console.error('获取队列状态失败:', err);
    }
  };

  // 生成音频函数
  const generateSpeech = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 先检查队列状态
      await fetchQueueStatus();
      
      const response = await fetch('/api/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: script,
          voice: selectedVoice.toLowerCase(),
          instructions: vibeText
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        return url;
      } else {
        let errorMessage = '生成音频失败';
        
        switch (response.status) {
          case 400:
            errorMessage = '缺少必需的参数 (input 或 voice)';
            break;
          case 429:
            const retryAfter = response.headers.get('Retry-After');
            errorMessage = `请求过于频繁，请稍后再试${retryAfter ? `（${retryAfter}秒后）` : ''}`;
            break;
          case 500:
            errorMessage = '服务器内部错误';
            break;
          default:
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成音频失败');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 播放处理函数
  const handlePlay = async (vibe?: string, text?: string) => {
    try {
      if (isLoading) return;
      
      // 如果正在播放，则停止播放
      if (isPlaying && audioInstance) {
        audioInstance.pause();
        setIsPlaying(false);
        return;
      }

      // 使用传入的参数或当前状态
      const currentVibe = vibe || selectedVibe;
      const currentScript = text || script;

      // 每次点击都重新生成音频
      const url = await generateSpeech();
      if (!url) return;

      const audio = new Audio(url);
      (audio as any).dataset.voice = selectedVoice;
      (audio as any).dataset.vibe = currentVibe;
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      // 停止并清除之前的音频实例
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.remove();
      }
      
      setAudioInstance(audio as CustomAudioElement);
      audio.play();
      setIsPlaying(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '播放音频失败');
    }
  };

  // 下载处理函数
  const handleDownload = async () => {
    try {
      if (isLoading) return;

      let url = audioUrl;
      if (!url) {
        url = await generateSpeech();
        if (!url) return;
      }

      const link = document.createElement('a');
      link.href = url;
      link.download = 'generated-speech.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err instanceof Error ? err.message : '下载音频失败');
    }
  };

  // 分享处理函数
  const handleShare = async () => {
    try {
      if (isLoading) return;

      let url = audioUrl;
      if (!url) {
        url = await generateSpeech();
        if (!url) return;
      }

      if (navigator.share) {
        await navigator.share({
          title: '分享生成的音频',
          text: '听听这个AI生成的音频！',
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('链接已复制到剪贴板');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分享失败');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header devMode={devMode} setDevMode={setDevMode} />
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-2 flex flex-1 flex-col">
          <div className="flex flex-col gap-4">
            <VoiceSection
              selectedVoice={selectedVoice}
              setSelectedVoice={handleVoiceChange}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
              <VibeSection
                selectedVibe={selectedVibe}
                setSelectedVibe={setSelectedVibe}
                vibeText={vibeText}
                setVibeText={setVibeText}
                script={script}
                setScript={setScript}
              />
              <ScriptSection
                script={script}
                setScript={setScript}
                defaultScript={defaultScript}
                selectedVibe={selectedVibe}
              />
            </div>
          </div>
          {error && (
            <div className="fixed bottom-4 left-4 right-4 flex justify-center">
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg shadow-lg">
                {error}
              </div>
            </div>
          )}
          <Footer
            isLoading={isLoading}
            queuePosition={queueStatus?.queue_size}
            maxQueueSize={queueStatus?.max_queue_size}
            onPlay={handlePlay}
            onShare={handleShare}
            onDownload={handleDownload}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
