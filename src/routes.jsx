import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading_screen from './Pages/Loading_screen';
import Splash_screen from './Pages/Splash_screen';
import Menu_screen from './Pages/Menu_screen';
import Level_screen from './Pages/Level_screen';
import Setting_screen from './Components/Comman/Setting_screen';
import Intro1 from './Pages/Intro/Intropage1';
import Storytemplate from './Components/Layout/Storytemplate';
import Intro1Bg from './Assets/Images/intro1.jpg';
import Intro2Bg from './Assets/Images/intro2.jpg';
import Intro3Bg from './Assets/Images/intro3.jpg';
import Intro4Bg from './Assets/Images/intro4.jpg';
import Intro5Bg from './Assets/Images/intro5.jpg';
import Level1Bg1 from './Assets/Images/level1_1.jpg';
import Level1Bg2 from './Assets/Images/level1_2.jpg';
import Level1Bg3 from './Assets/Images/level1_3.jpg';
import Level1Bg5 from './Assets/Images/level1_5.jpg';
import Level1Bg4 from './Assets/Images/level1_4.mp4';
import Pause2_screen from './Pages/Level_1/Pause2';
import Level1_screen1 from './Pages/Level_1/Level1_1';
import Losing_screen from './Pages/Losing_screen';
import Level1_screen2 from './Pages/Level_1/Level1_2';
import Endless_screen from './Pages/Endless_screen';
import Level2Bg1 from './Assets/Images/level2_1.jpg';
import Level2Bg2 from './Assets/Images/level2_2.jpg';
import Level2Bg3 from './Assets/Images/level2_3.jpg';
import Level2Bg4 from './Assets/Images/level2_4.jpg';
import Level2Bg5 from './Assets/Images/level2_5.jpg';
import Level2Bg6 from './Assets/Images/level2_6.jpg';
import Level2Bg7 from './Assets/Images/level2_7.jpg';
import Level2Bg8 from './Assets/Images/level2_8.jpg';
import Pause3_screen from './Pages/Level_2/Pause3_screen';
import Pause4_screen   from './Pages/Level_2/Pause4_screen';
import Level2_screen1  from './Pages/Level_2/Level2_1';
import Level2_screen2  from './Pages/Level_2/Level2_2';
import Level3Bg1 from './Assets/Images/level3_1.png';
import Level3Bg2 from './Assets/Images/level3_2.png';
import Level3Bg3 from './Assets/Images/level3_3.png';
import Level3Bg4 from './Assets/Images/level3_4.png';
import Level3Bg5 from './Assets/Images/level3_5.png';
import Pause5_screen from './Pages/Level_3/Pause5_screen';
import Pause6_screen from './Pages/Level_3/Pause6_screen';
import Level3_screen1 from './Pages/Level_3/Level3_1';
import Level3_screen2 from './Pages/Level_3/Level3_2';
import RandomGame   from './Pages/Endless_screen';

const Routess = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main screens  */}

        <Route path="/"          element={<Loading_screen />} />
        <Route path="/splash"    element={<Splash_screen />} />
        <Route path="/menu"      element={<Menu_screen />} />
        <Route path="/levels"    element={<Level_screen />} />
        <Route path="/settings"  element={<Setting_screen />} />
        <Route path="/losing"    element={<Losing_screen/>} />
        <Route path="/levels_2"  element={<Level_screen/>} />
        <Route path="/endless"   element={<Endless_screen />} />

        {/* Intro */}

        <Route path="/story1"    element={<Intro1 />} />
        <Route path="/story2"
         element={
    <Storytemplate background={Intro1Bg} nextPath="/story3"
      lines={[
        '"In the modern city of Kemet. A city built on top of a kingdom that never fully died.".',
        '"The ancient river still runs"',
        '"Its called ITERU"',
      ]}
      quoteIndex={2}
    />
  }
/> 
           <Route path="/story3"
         element={
    <Storytemplate background={Intro2Bg} nextPath="/Story4"
      lines={[
        '"Iteru. Not just a river. A living archive."',
        '"Every soul that ever drowned in it, prayed to it, or died beside it left a story in its current."',
        '"Some of those stories never ended right.They loop,And the loop makes the water sick."',
        '"And when the water is sick the world above cracks."',
      ]}
      quoteIndex={3}
    />
  }
/>
        <Route path="/story4"
         element={
    <Storytemplate background={Intro3Bg} nextPath="/Story5"
      lines={[
        '"This is Nebet."',
        '"She was born at the exact moment Iteru last overflowed. She and the river share a heartbeat"',
        '"The river has known her name since before she had one. It has been waiting."',
      ]}
      quoteIndex={2}
    />
  }
/>
        <Route path="/story5"
         element={
    <Storytemplate background={Intro4Bg} nextPath="/Story6"
      lines={[
        '"She cannot swim. She has never been able to."',
        '"When she enters the water, she does not drown."',
        '"She sinks into memory."',
      ]}
      quoteIndex={2}
    />
  }
/>
        <Route path="/story6"
         element={
    <Storytemplate background={Intro5Bg} nextPath="/levels"
      lines={[
        '"The water is rising and the ITERU is calling her."',
        '"She does not know yet that she was chosen the moment she took her first breath. She only knows that the water is calling."',
        '"Will she answer it ??"',
      ]}
      quoteIndex={2}
    />
  }
/>
       {/* Level 1 */}

        <Route path="/game"
         element={
    <Storytemplate background={Level1Bg1} nextPath="/level1_1"
      lines={[
        '"Nebet is pulled more under without warning diving deeper and deeper."',
        '"She is being controlled by the river but somehow she feels safe "',
        '"Her vision started to become blurry and she saw visions."',
      ]}
      quoteIndex={2}
    />
  }
/>
        <Route path="/level1_1"
         element={
    <Storytemplate background={Level1Bg2} nextPath="/level1_2"
      lines={[
        `"In 650 BCE there was a father accused of theft against the temple under the
 disgrace of here fathers act.  She was registered at birth under a placeholder: Daughter of
the Accused."`,
      ]}
      quoteIndex={0}
    />
  }
/>
        <Route path="/level1_2"
         element={
    <Storytemplate background={Level1Bg3} nextPath="/level1_3"
      lines={[
        `Her mother, before dying whispered her real name to her once a name, chosen with love, never spoken again. The child lived to adulthood being called the wrong name.`,
      ]}
      quoteIndex={0}
    />
  }
/>
  <Route path="/level1_3"  element={< Pause2_screen />} />

        <Route path="/level1_4"
         element={
    <Storytemplate backgroundVideo={Level1Bg4} nextPath="/level1_5"
      lines={[
        `She realizes that the room is frozen in the hour after her mother died, the child doesn't look up. She doesn't know Nebet is there.
        Nebet cannot speak yet. She cannot touch anything. She can only watch  and notice.
        `,
      ]}
      quoteIndex={0}
    />
  }
/>
        <Route path="/level1_5"
         element={
    <Storytemplate backgroundVideo={Level1Bg4} nextPath="/level1_6"
      lines={[
        `She realizes that the room is frozen in the hour after her mother died, the child doesn't look up. She doesn't know Nebet is there.
        Nebet cannot speak yet. She cannot touch anything. She can only watch  and notice. `,
      ]}
      quoteIndex={0}
    />
  }
/>
 <Route path="/level1_6"  element={< Level1_screen1 />} />

   <Route path="/level1_7" element={<Level1_screen2 />} />

        <Route path="/level1_8"
         element={
    <Storytemplate backgroundVideo={Level1Bg4} nextPath="/level1_6"
      lines={[
        '"Now her name is spoken."',
        '"At last she rests in peace her name is no longer a whisper of shame ."',
        '"Free at last from her fathers sins."',
      ]}
      quoteIndex={2}
    />
  }
/>
     {/* level2 */}

        <Route path="/level2_start"
         element={
    <Storytemplate background={Level2Bg1} nextPath="/level2_1"
      lines={[
        '"The city cannot find itself."',
        `"Navigation systems give wrong directions a wrong map is overwriting the correct maps with a
        version no one remembers seeing before."`,
        '"They cannot delete them."',
      ]}
      quoteIndex={2}
    />
    }
    />
     
         <Route path="/level2_1"
         element={
    <Storytemplate background={Level2Bg2} nextPath="/level2_2"
      lines={[
        '"This time is different when river pulled the first time it was Gentle, Curious, Testing."',
        `"This time it’s Impatient ."`,
        '"This soul has been waiting longer than most."',
      ]}
      quoteIndex={2}
    />
    }
    />

         <Route path="/level2_2"
         element={
    <Storytemplate background={Level2Bg3} nextPath="/level2_3"
      lines={[
        '"She was the most gifted cartographer in the royal survey corps."',
        `"Twelve years. Every tributary. Every flood channel. Every bend she had walked beside barefoot as a child."`,
      ]}
      quoteIndex={1}
    />
    }
    />

             <Route path="/level2_3"
         element={
    <Storytemplate background={Level2Bg4} nextPath="/level2_4"
      lines={[
        `"When her senior scribe presented the survey to Pharaoh's court — he presented it as his own."`,

      ]}
      quoteIndex={0}
    />
    }
    />

         <Route path="/level2_4"
         element={
    <Storytemplate background={Level2Bg5} nextPath="/level2_4p"
      lines={[
        '"He had access. She did not."',
        `"She was not sad that her work was taken."`,
        '"She was enraged that no one saw it happen."',
      ]}
      quoteIndex={2}
    />
    }
    />

      <Route path="/level2_4p"  element={< Pause3_screen />} />
   
      <Route path="/level2_5"
         element={
    <Storytemplate background={Level2Bg6} nextPath="/level2_6"
      lines={[
        '"She made copies."',
        `"She hid them where she knew they would last. She was hiding them as evidence."`,
        '"She died still waiting. No one came. Until now."',
      ]}
      quoteIndex={2}
    />
    }
    />

       <Route path="/level2_6"
         element={
    <Storytemplate background={Level2Bg7} nextPath="/level2_7"
      lines={[
        '"You cannot rewrite what happened."',
        `"But you can look at what she left behind."`,
        '"And you can say what you see."',
      ]}
      quoteIndex={2}
    />
    }
    />

    <Route path="/level2_7"     element={<Pause4_screen />} />
    <Route path="/level2_game"  element={<Level2_screen1 />} />
    <Route path="/level2_game1" element={<Level2_screen2 />} />
   
{/* Level 3 — The Priest Who Doubted */}

<Route path="/level3_start"
  element={
    <Storytemplate background={Level3Bg1} nextPath="/level3_1"
      lines={[
        '"The temples are losing their sound."',
        '"Prayers disappear mid-word. The microphones record silence where sound was made."',
        '"No one is frightened. They are only alone."',
      ]}
      quoteIndex={2}
    />
  }
/>

<Route path="/level3_1"
  element={
    <Storytemplate background={Level3Bg2} nextPath="/level3_2"
      lines={[
        '"This time the river does not pull her."',
        '"It simply stops being loud."',
        '"And then she is there."',
      ]}
      quoteIndex={2}
    />
  }
/>

<Route path="/level3_2"
  element={
    <Storytemplate background={Level3Bg3} nextPath="/level3_3"
      lines={[
        '"He was the most devoted priest of his generation."',
        '"In the fourteenth year of his service, quietly and without drama, he stopped believing."',
      ]}
      quoteIndex={1}
    />
  }
/>

<Route path="/level3_3"
  element={
    <Storytemplate background={Level3Bg4} nextPath="/level3_4"
      lines={[
        '"He did not stop. He kept performing every rite, every day."',
        '"He stayed for the people watching. Not for himself."',
        '"He told no one. Not once."',
      ]}
      quoteIndex={2}
    />
  }
/>

<Route path="/level3_4"
  element={
    <Storytemplate background={Level3Bg5} nextPath="/level3_4p"
      lines={[
        '"He died mid-recitation."',
        '"The words simply stopped coming out."',
        '"His question never left his lips. Until now."',
      ]}
      quoteIndex={2}
    />
  }
/>

<Route path="/level3_4p"  element={<Pause5_screen />} />

<Route path="/level3_5"
  element={
    <Storytemplate background={Level3Bg3} nextPath="/level3_6"
      lines={[
        '"You cannot answer his question."',
        '"You can only stay inside it with him."',
        '"That is what he has been waiting for."',
      ]}
      quoteIndex={2}
    />
  }
/>

<Route path="/level3_6"
  element={
    <Storytemplate background={Level3Bg4} nextPath="/level3_7"
      lines={[
        '"Watch carefully."',
        '"The order of doubt is not the order of the rite."',
        '"Remember what you see. Not what you expect."',
      ]}
      quoteIndex={2}
    />
  }
/>

<Route path="/level3_7"     element={<Pause6_screen />} />
<Route path="/level3_game"  element={<Level3_screen1 />} />
<Route path="/level3_game1" element={<Level3_screen2 />} />


      </Routes>
    </BrowserRouter>

  );
};

export default Routess;