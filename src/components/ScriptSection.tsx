import React from 'react';

interface ScriptSectionProps {
  script: string;
  setScript: (script: string) => void;
  defaultScript: string;
  selectedVibe: string;
}

const ScriptSection: React.FC<ScriptSectionProps> = ({ script, setScript, defaultScript, selectedVibe }) => {
  // 获取字符数
  const charCount = script.length;

  // 检查当前脚本是否是默认脚本
  const isDefaultScript = script === defaultScript;

  return (
    <div className="flex flex-1 flex-col shrink-0">
      <div className="flex flex-row justify-between items-center gap-2 mb-4">
        <div className="flex uppercase py-1 text-sm font-medium tracking-wider text-gray-500/90">SCRIPT</div>
        <div className="flex flex-1 h-[1px] bg-gradient-to-r from-gray-200/30 via-gray-200/50 to-gray-200/30"></div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="relative flex flex-1">
          <textarea
            id="prompt"
            rows={8}
            maxLength={999}
            className="w-full resize-none outline-none focus:outline-none bg-screen p-3 sm:p-4 rounded-lg border border-gray-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(255,255,255,1)] text-[14px] sm:text-[16px] min-h-[250px] leading-relaxed"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Type or paste your script here..."
          />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            {script !== scriptPresets[selectedVibe] && (
              <button
                onClick={() => setScript(scriptPresets[selectedVibe])}
                className="uppercase text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                RESET
              </button>
            )}
            <span className="text-gray-400/80 text-sm font-mono ml-auto">
              {charCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptSection;

// 所有可用的示例脚本文本映射
const scriptPresets: { [key: string]: string } = {
  'Pirate': `Ahoy, me hearties! Gather 'round as I tell ye the tale of our latest voyage!

We set sail from Tortuga at dawn, with the wind in our sails and adventure in our hearts. The seas were rough, aye, but nothing the Black Pearl couldn't handle!

As we approached the mysterious isle, dark clouds gathered overhead. Thunder boomed like cannon fire, and lightning split the sky! But did we turn back? Not on your life!

Suddenly, through the mist, we spotted it - the legendary treasure cave! Shiver me timbers, what a sight it was! Gold and jewels as far as the eye could see!

So remember, ye landlubbers: fortune favors the bold, and the greatest treasures await those brave enough to seek them! Yo ho ho!`,

  'Calm': `Welcome to today's mindfulness session. Let's take a moment to find our center and create a space of peace and tranquility.

Begin by taking a deep, gentle breath. Feel the air filling your lungs, bringing with it a sense of calm and renewal. As you exhale, release any tension you've been holding.

Notice the quiet strength in your body, the steady rhythm of your heartbeat. Each breath brings you deeper into a state of peaceful awareness.

Remember, this moment of stillness is always available to you. You can return to it whenever you need to find balance and clarity.

Let's take one final breath together, carrying this sense of peace with us as we continue our day.`,

  'Connoisseur': `Ladies and gentlemen, allow me to present this exquisite 1982 Bordeaux, a true masterpiece of viticulture.

Notice first the deep ruby color, still vibrant after decades of careful aging. As you gently swirl the glass, observe how the wine creates those elegant legs along the sides.

The bouquet is simply extraordinary - layers of black currant and cedar, with subtle hints of tobacco and leather. Each note has been perfectly preserved, telling the story of its terroir.

On the palate, you'll discover an impeccable balance of fruit and tannins, with remarkable complexity and a finish that seems to last for minutes.

This, my friends, is what we call a wine of profound character and distinction.`,

  'Gourmet Chef': `Today we're creating a magnificent coq au vin, a classic French dish that transforms humble ingredients into culinary gold.

First, we begin with the marinade - rich red wine, aromatic vegetables, and fresh herbs infusing our free-range chicken with deep, complex flavors. Notice how the wine's acidity helps tenderize the meat.

Watch as we sear the chicken to golden perfection, developing those crucial caramelized flavors. The sound of the sizzle tells us we're building a proper fond - that's where the magic begins!

Now we'll add our pearl onions and mushrooms, each carefully prepared to contribute their unique character to the dish. The sauce should be silky, rich, and glossy - a perfect harmony of wine and stock.

Remember, patience is key. Let each step develop fully, and you'll be rewarded with a dish that sings with flavor!`,

  'Mad Scientist': `EUREKA! My latest experiment has yielded EXTRAORDINARY results! 

*maniacal laughter*

Through the application of my revolutionary quantum-neural-matrix-recombinator, I've successfully merged the properties of coffee and pizza! YES, you heard that correctly - COFFEE PIZZA!

The molecular structure is FASCINATING! The caffeine molecules have formed a perfectly stable bond with the cheese proteins, creating an entirely new form of matter! The implications are STAGGERING!

*sound of sparking electricity*

But wait - there's more! When exposed to moonlight, it GLOWS IN THE DARK! And the taste... oh, the TASTE! It's like having breakfast, lunch, and dinner simultaneously in a parallel universe!

SCIENCE HAS NEVER BEEN MORE DELICIOUS! Now, who wants to be my test subject? MWAHAHAHA!`
  // ... 其他预设脚本
};
