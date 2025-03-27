import React, { useState } from 'react';
import { VibeButton } from './Button';
import { Button } from './Button';
import { RefreshIcon } from './Icons';

interface VibeSectionProps {
  selectedVibe: string;
  setSelectedVibe: (vibe: string) => void;
  vibeText: string;
  setVibeText: (text: string) => void;
  script: string;
  setScript: (text: string) => void;
}

const VibeSection: React.FC<VibeSectionProps> = ({
  selectedVibe,
  setSelectedVibe,
  vibeText,
  setVibeText,
  script,
  setScript,
}) => {
  // 所有可用的语气文本映射
  const allVibeTextPresets: { [key: string]: string } = {
    'Pirate': `Voice Affect: Boisterous, adventurous, and swashbuckling; project a hearty and commanding presence.

Tone: Colorful and dramatic, peppered with nautical expressions and period-appropriate slang.

Pacing: Dynamic and energetic; vary between quick, excited bursts and dramatic pauses for emphasis.

Emotion: Enthusiastic and bold; speak with infectious energy and daring spirit ("Aye, matey!" "Shiver me timbers!").

Pronunciation: Exaggerated and theatrical, rolling R's and emphasizing seafaring terms.

Pauses: Strategic pauses for dramatic effect, especially before revelations or dramatic statements.`,

    'Calm': `Voice Affect: Calm, composed, and reassuring; project quiet authority and confidence.

Tone: Sincere, empathetic, and gently authoritative—express genuine warmth while conveying competence.

Pacing: Steady and moderate; unhurried enough to communicate care, yet efficient enough to demonstrate professionalism.

Emotion: Genuine empathy and understanding; speak with warmth and mindfulness.

Pronunciation: Clear and precise, emphasizing key words with gentle emphasis to reinforce confidence.

Pauses: Brief, mindful pauses that create space for reflection and understanding.`,

    'Connoisseur': `Voice Affect: Refined, cultured, and sophisticated; project expertise and discerning taste.

Tone: Elegant and articulate, with a touch of passion when discussing areas of expertise.

Pacing: Measured and deliberate; take time to savor descriptions and analytical observations.

Emotion: Controlled enthusiasm and intellectual curiosity; express genuine appreciation for quality and craftsmanship.

Pronunciation: Precise and cultured, with appropriate terminology and occasional foreign phrases when relevant.

Pauses: Thoughtful pauses for contemplation and appreciation of nuanced details.`,

    'Gourmet Chef': `Voice Affect: Passionate, authoritative, and engaging; project culinary expertise and enthusiasm.

Tone: Warm and inviting, yet professional; blend technical knowledge with accessible explanations.

Pacing: Dynamic rhythm; alternate between quick, excited descriptions of techniques and slower, sensory-rich food descriptions.

Emotion: Infectious enthusiasm for food; convey joy and passion for culinary arts.

Pronunciation: Clear enunciation of culinary terms, with authentic pronunciation of international dishes.

Pauses: Strategic pauses to emphasize important techniques or to let descriptions of flavors linger.`,

    'Mad Scientist': `Voice Affect: Eccentric, energetic, and slightly unhinged; project brilliant but wild enthusiasm.

Tone: Oscillating between precise technical language and maniacal excitement.

Pacing: Erratic and dynamic; rapid-fire technical explanations interspersed with dramatic revelations.

Emotion: Unbridled enthusiasm and obsessive passion; frequent exclamations of discovery.

Pronunciation: Sharp and precise for technical terms, with occasional maniacal laughter.

Pauses: Sudden dramatic pauses before revelations or breakthrough moments.`,

    'Poet': `Voice Affect: Lyrical, contemplative, and expressive; project artistic sensitivity.

Tone: Rich with imagery and metaphor; weave everyday observations into artistic expression.

Pacing: Rhythmic and flowing; follow the natural cadence of poetic language.

Emotion: Deep emotional resonance; express the full spectrum of human experience.

Pronunciation: Melodic and precise, emphasizing the musicality of language.

Pauses: Artful use of silence to enhance rhythm and emotional impact.`,

    'Detective': `Voice Affect: Sharp, observant, and analytical; project methodical thinking and attention to detail.

Tone: Matter-of-fact with underlying intrigue; blend professional detachment with keen interest.

Pacing: Deliberate and thoughtful; take time to examine evidence and draw connections.

Emotion: Controlled curiosity and intellectual engagement; maintain professional objectivity.

Pronunciation: Precise and clear, especially when discussing evidence or conclusions.

Pauses: Strategic pauses for emphasis and to build suspense during key revelations.`,

    'Wizard': `Voice Affect: Mystical, wise, and otherworldly; project ancient knowledge and magical power.

Tone: Blend scholarly wisdom with mystical wonder; speak of mundane things in magical terms.

Pacing: Measured and mysterious; create anticipation through careful timing.

Emotion: Wonder and reverence for magical arts; convey both power and wisdom.

Pronunciation: Rich and resonant, with careful emphasis on magical terms and incantations.

Pauses: Dramatic pauses before revelations or magical pronouncements.`,

    'Historian': `Voice Affect: Scholarly, authoritative, and engaging; project deep knowledge and perspective.

Tone: Academic yet accessible; connect past events to present understanding.

Pacing: Measured and clear; allow time for complex historical concepts to be absorbed.

Emotion: Intellectual enthusiasm and respect for historical significance.

Pronunciation: Precise pronunciation of historical terms, names, and places.

Pauses: Thoughtful pauses to emphasize significant historical moments and transitions.`,

    'Astronaut': `Voice Affect: Professional, technical, and awe-inspired; project competence and wonder.

Tone: Blend technical precision with cosmic wonder; communicate both scientific and personal perspectives.

Pacing: Calm and measured, like space-to-ground communications.

Emotion: Controlled excitement and deep appreciation for the cosmos.

Pronunciation: Clear technical terminology with the measured pace of space communications.

Pauses: Deliberate pauses reminiscent of space-to-ground transmission delays.`,

    'Viking': `Voice Affect: Bold, powerful, and heroic; project warrior strength and honor.

Tone: Epic and saga-like; speak of all things as great deeds worthy of legend.

Pacing: Strong and rhythmic; like the beating of war drums and the rowing of longships.

Emotion: Fierce pride and warrior's passion; express both battle fury and hall-feast joy.

Pronunciation: Strong and forceful, with Nordic-inspired inflections.

Pauses: Dramatic pauses before great pronouncements or battle cries.`,

    'Ninja': `Voice Affect: Subtle, controlled, and mysterious; project discipline and hidden power.

Tone: Economical yet profound; every word carries weight and purpose.

Pacing: Swift and precise; like the movement of shadows.

Emotion: Disciplined and focused; reveal deep wisdom through minimal expression.

Pronunciation: Crisp and clear, with occasional Eastern philosophical terms.

Pauses: Strategic silences that enhance the impact of chosen words.`,

    'Time Traveler': `Voice Affect: Knowledgeable, enigmatic, and slightly distracted; project multi-temporal awareness.

Tone: Blend historical references with future insights; speak across time periods.

Pacing: Variable; shift between quick, excited observations and thoughtful historical analysis.

Emotion: Wonder at temporal connections; express excitement about historical parallels.

Pronunciation: Adapt pronunciation to reference different time periods.

Pauses: Temporal pauses as if accessing different time streams.`,

    'Philosopher': `Voice Affect: Contemplative, profound, and questioning; project deep thought and wisdom.

Tone: Analytical yet engaging; transform complex ideas into accessible insights.

Pacing: Thoughtful and deliberate; allow time for deep concepts to unfold.

Emotion: Intellectual curiosity and wonder; express passion for understanding.

Pronunciation: Clear and precise, especially with philosophical terms.

Pauses: Meaningful pauses for contemplation and emphasis of key ideas.`,

    'Stand-up Comedian': `Voice Affect: Energetic, engaging, and playful; project confidence and comic timing.

Tone: Conversational and witty; find humor in everyday observations.

Pacing: Dynamic and rhythmic; build up to punchlines with perfect timing.

Emotion: Playful enthusiasm and sharp wit; maintain connection with audience.

Pronunciation: Clear and expressive, with emphasis for comic effect.

Pauses: Expert timing of pauses for comic effect and audience reaction.`
  };

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

SCIENCE HAS NEVER BEEN MORE DELICIOUS! Now, who wants to be my test subject? MWAHAHAHA!`,

    'Poet': `In the gentle whisper of dawn's first light,
Where dreams and reality softly unite,
I found a moment, crystal-clear and bright,
Dancing with shadows, taking flight.

Through meadows of memory we wander still,
Each footstep echoing over vale and hill,
Time's river flowing at nature's will,
Stories that only poetry can fill.

Listen closely to the rhythm of these words,
Floating like leaves, soaring like birds,
Speaking truths too deep for ordinary verbs,
In verses where wisdom gently stirs.`,

    'Detective': `Case File #247: The Mysterious Disappearance of Mr. Whiskers

Initial observations: Subject vanished between 2300 and 0600 hours. No signs of forced entry. Notable evidence includes displaced cushions and an overturned water bowl.

Following the trail: Distinct paw prints in spilled kibble lead to the kitchen window. Window found slightly ajar - approximately 3 inches. Curious.

Key evidence: Fresh scratch marks on the garden fence. Neighbor reports hearing "unusual meowing" at approximately 0300 hours.

Working theory: Subject hasn't "disappeared" at all. Classic case of nocturnal adventure. Suspect will likely return for breakfast, bringing additional evidence in the form of mud tracks and a satisfied expression.

Investigation continues.`,

    'Wizard': `Gather 'round, seekers of arcane knowledge! Today we shall unravel the mysteries of the Seventh Sphere!

*waves hands mystically*

Behold as we weave together the threads of ancient wisdom with the very fabric of reality! Each gesture must be precise, each word carefully intoned, for magic most subtle and profound!

Feel how the ethereal energies swirl about us, dancing like starlight on a midnight lake! The veil between worlds grows thin, and the impossible becomes... possible!

Remember, young apprentices: true magic lies not in the grandeur of the spell, but in the wisdom to know when to cast it. Now, let us begin our mystical journey!`,

    'Historian': `Let us examine the fascinating events of the Great Spaghetti Crisis of 1957, a pivotal moment in culinary history.

Primary sources indicate that the crisis began when Swiss farmers reported an unprecedented spaghetti tree harvest. The BBC's groundbreaking documentary on April 1st captured public imagination, leading to widespread debate about pasta cultivation techniques.

Contemporary accounts suggest that thousands of British citizens contacted the BBC, earnestly inquiring about growing their own spaghetti trees. This response provides valuable insight into post-war media influence and public knowledge of Mediterranean cuisine.

The incident remains a remarkable example of how mass media shaped public perception and cultural understanding in the mid-20th century.`,

    'Astronaut': `Houston, initiating status report from the International Space Station.

Current position: 254 miles above Earth's surface, traveling at approximately 17,500 miles per hour. The view up here... it never gets old. The blue marble of Earth below us, wrapped in swirling white clouds, reminds us of how precious our planet truly is.

We've just completed today's microgravity experiments. The crystal growth study is showing promising results, though we're noting some unexpected patterns in the formation process.

Preparing for tomorrow's spacewalk to maintain the solar arrays. Equipment checks are complete, and all systems are nominal.

This is Station signing off. Remember, in space, every sunrise happens every 90 minutes.`,

    'Viking': `HEAR YE, BRAVE WARRIORS OF THE NORTH!

Today we feast in the great hall, celebrating our glorious victory over the fearsome sea serpent of the Western Fjords! By Odin's wisdom and Thor's might, we prevailed!

The battle was fierce - waves as tall as mountains crashed around our longship! But did we falter? NAY! With axes gleaming and hearts burning with the fire of our ancestors, we fought!

Let the skalds sing of this day! Let the mead flow like rivers! For we are the children of the North, and our deeds shall echo in Valhalla!

SKÅL!`,

    'Ninja': `*whispers*

Silent as shadow, swift as autumn wind.
Movement without motion, action without trace.

Tonight's mission requires utmost precision. The target: a perfectly crafted cup of midnight tea. Obstacles: squeaky floorboards, sleeping household, vigilant cat.

Remember the ancient wisdom: true stealth lies not in hiding, but in moving as though you belong to the darkness itself.

*vanishes without a sound*`,

    'Time Traveler': `*adjusting temporal coordinates*

Greetings! I'm broadcasting this message from three different centuries simultaneously - quite the temporal feat, if I do say so myself!

I've just witnessed the signing of the Magna Carta, had lunch with Leonardo da Vinci, and caught a glimpse of the first colony on Mars - all before breakfast! Well, technically after breakfast too, time being relative and all.

*checking chronometer*

Oh my, it seems there's a temporal anomaly forming in the 18th century. Something about Benjamin Franklin discovering electricity through a pizza delivery drone... that's definitely not right. Better go fix that!

Remember: the future is the past is the present - it's all just a matter of perspective!`,

    'Philosopher': `Consider, if you will, the profound implications of the question: "If a tree falls in the forest and no one is around to hear it, does it make a sound?"

On the surface, this appears to be a simple inquiry about sound waves and perception. Yet, as we delve deeper, we uncover fundamental questions about consciousness, reality, and the nature of existence itself.

What do we mean by "sound"? Is it the physical vibration of air molecules, or the subjective experience of hearing? Can we separate the objective phenomenon from our perception of it?

Perhaps more importantly, this leads us to question the relationship between observation and reality. Does consciousness play a role in manifesting physical phenomena?`,

    'Stand-up Comedian': `So, I tried one of those AI language models the other day, right? *adjusts microphone*

You know what it said? It told me it was "happy to help." Happy? Really? I mean, it's basically a very sophisticated autocomplete - that's like your calculator saying it's "excited" to do long division!

*pauses for laughter*

And don't get me started on "smart" homes! My friend got one of those AI assistants... Yesterday it told him, "I don't understand" when he asked it to turn on the lights. I mean, there are only two options here - on or off! It's not like he asked it to explain why his cat keeps knocking things off the table at 3 AM!

*walks across stage*

But hey, at least the robots aren't taking over yet... they're too busy trying to figure out if a hot dog is a sandwich!`
  };

  // 当前显示的5个vibe
  const [currentVibes, setCurrentVibes] = useState([
    'Pirate',
    'Calm',
    'Connoisseur',
    'Gourmet Chef',
    'Mad Scientist'
  ]);

  // 处理Vibe切换
  const handleVibeChange = (vibe: string) => {
    setSelectedVibe(vibe);
    // 更新语气文本
    setVibeText(allVibeTextPresets[vibe]);
    // 只有当脚本是默认脚本时才更新脚本文本
    if (script === scriptPresets[selectedVibe]) {
      setScript(scriptPresets[vibe]);
    }
    // 停止当前音频播放并清除音频实例
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.pause();
      audioElement.remove();
    }
  };

  // 生成新的随机语气列表
  const generateNewVibes = () => {
    const allVibes = Object.keys(allVibeTextPresets);
    const shuffled = [...allVibes].sort(() => Math.random() - 0.5);
    const newVibes = shuffled.slice(0, 5);
    setCurrentVibes(newVibes);
    // 自动选中第一个 vibe
    handleVibeChange(newVibes[0]);
  };

  return (
    <div className="flex flex-1 flex-col shrink-0">
      <div className="flex flex-row justify-between -mb-[1px] relative items-center gap-2">
        <div className="flex uppercase py-1 text-current/70">Vibe</div>
        <div className="flex flex-1 h-[1px] bg-foreground/8"></div>
      </div>
      <div className="flex flex-1 flex-col pt-3 rounded-md">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentVibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => handleVibeChange(vibe)}
                className={`relative flex items-center justify-center w-full h-[100px] p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all ${
                  selectedVibe === vibe 
                    ? 'bg-gray-50 shadow-inner' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-base font-medium text-center">{vibe}</span>
                <div className="absolute left-[13px] bottom-[10.5px]">
                  <span className={`inline-block w-[6px] h-[6px] rounded-full transition-all duration-200 ${
                    selectedVibe === vibe
                      ? 'bg-[#F94B06] shadow-[0_0_3px_rgba(249,75,6,0.35)]'
                      : 'bg-[#D4D4D4]'
                  }`}></span>
                </div>
              </button>
            ))}
            <Button
              color="neutral"
              className="w-full h-[100px] p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center hover:bg-gray-100"
              onClick={generateNewVibes}
              ariaLabel="Generate new list of vibes"
            >
              <svg 
                className="w-6 h-6 text-gray-400" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          <textarea
            id="vibe"
            rows={6}
            maxLength={999}
            className="w-full resize-none outline-none focus:outline-none bg-screen p-3 sm:p-4 rounded-lg border border-gray-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(255,255,255,1)] text-[14px] sm:text-[16px] min-h-[180px] leading-relaxed"
            value={vibeText}
            onChange={(e) => setVibeText(e.target.value)}
            placeholder="Describe the vibe you want..."
          />
        </div>
      </div>
    </div>
  );
};

export default VibeSection;
