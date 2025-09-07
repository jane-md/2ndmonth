document.addEventListener('DOMContentLoaded', function(){  
  const $=id=>document.getElementById(id);  

  /* ===== JUKEBOX ===== */  
  let currentAudio = null;  
  let currentBtn = null;  

  document.querySelectorAll('.song-card').forEach(card => {  
    const btn = card.querySelector('.play-btn');  
    const audioSrc = card.dataset.audio;  
    const audio = new Audio(audioSrc);  

    // initial state: show play icon  
    btn.innerHTML = '<span class="icon play"></span>';  

    btn.addEventListener('click', () => {  
      if (currentAudio && currentAudio !== audio) {  
        currentAudio.pause();  
        if (currentBtn) currentBtn.innerHTML = '<span class="icon play"></span>';  
      }  
      if (audio.paused) {  
        audio.play();  
        btn.innerHTML = '<span class="icon pause"></span>';  
        currentAudio = audio;  
        currentBtn = btn;  
      } else {  
        audio.pause();  
        btn.innerHTML = '<span class="icon play"></span>';  
      }  
    });  

    audio.addEventListener('ended', () => {  
      btn.innerHTML = '<span class="icon play"></span>';  
    });  
  });  

  /* ===== BUCKET LIST (no add button) ===== */  
  function initBucket(){  
    const bucketList=$('bucketList');  
    function saveItem(key,done){localStorage.setItem('bucket_'+key,done?'1':'0')}  
    function restoreChecks(){  
      bucketList.querySelectorAll('input[type=checkbox]').forEach(input=>{  
        let key=input.dataset.key;let saved=localStorage.getItem('bucket_'+key);  
        if(saved==='1'){input.checked=true;input.parentElement.classList.add('done')}  
        input.onchange=()=>{input.parentElement.classList.toggle('done',input.checked);saveItem(key,input.checked)};  
      });  
    }  
    restoreChecks();  
  }  
  initBucket();  

  /* ===== LETTER ===== */  
  $('openLetter').onclick=()=>{  
    $('letterContent').style.display='block';  
    $('openLetter').style.display='none';  
  };  

  /* ===== REASONS ===== */  
  const REASONS=[  
    `I love how you kiss me through calls and voice messages, it always makes me smile.`,  
    `Your laugh is my favorite sound.`,  
    `I love how patient you are with me.`,  
    `You choose us, every single day.`,  
    `You never fail to check on me and tell me to take care.`,   
    `You’re wise and thoughtful, always thinking carefully and looking at every angle.`,   
    `The way you talk to me, so gentle, makes me feel like your baby.`,   
    `I love our little routines. Greeting each other, calls, games, and movie nights together.`,   
    `You comfort me with hugs, kisses, and reminding me you’re here.`,  
    `You protect my feelings, no matter what.`,   
    `In every tampuhan, you always choose me and never give up on us.`,   
    `Our love is gentle, assured, and lovely.`,   
    `Because even from afar, you make me feel at home.`,   
    `Because you’re my safe place, no matter what we go through.`,   
    `I love how even our silly, naughty talks make us laugh and feel closer.`,   
    `I love how with you, I can see a future because it’s always you I want.`  
  ];  

  let reasonIdx=-1;  
  const reasonEl=$('reasonText');  

  function typeWriter(txt){  
    reasonEl.textContent='';  
    let i=0;  
    let t=setInterval(()=>{  
      reasonEl.textContent+=txt[i++];  
      if(i>=txt.length)clearInterval(t)  
    },22);}  

  function showNext(){  
    reasonIdx=(reasonIdx+1)%REASONS.length;  
    typeWriter(REASONS[reasonIdx]);  
  }  

  $('nextReason').onclick=showNext;   
  $('prevReason').onclick=()=>{  
    reasonIdx=(reasonIdx-1+REASONS.length)%REASONS.length;  
    typeWriter(REASONS[reasonIdx])  
  };  

  showNext();  
});
