(function(){
  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll('[data-reveal]');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function(el){ io.observe(el); });

  // ---------- Nav hide on scroll down ----------
  var nav = document.getElementById('nav');
  if(nav){
    var lastY = window.scrollY;
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if(y > lastY && y > 140){ nav.classList.add('hide'); } else { nav.classList.remove('hide'); }
      lastY = y;
    }, { passive: true });
  }

  // ---------- Folio indicator ----------
  var sections = document.querySelectorAll('[data-section]');
  var folioText = document.getElementById('folio-text');
  if(folioText && sections.length){
    var folioIO = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ folioText.textContent = e.target.getAttribute('data-section'); } });
    }, { threshold: 0.5 });
    sections.forEach(function(s){ folioIO.observe(s); });
  }

  // ---------- Path draw-in (works on any element with .draw-path) ----------
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){
    document.querySelectorAll('.draw-path').forEach(function(p, i){
      try{
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.getBoundingClientRect();
        p.style.transition = 'stroke-dashoffset 2.2s cubic-bezier(.22,.61,.16,1) ' + (i*0.15) + 's';
        requestAnimationFrame(function(){ setTimeout(function(){ p.style.strokeDashoffset = 0; }, 180); });
      }catch(e){}
    });
  }

  // ---------- Spirograph / hypotrochoid path generator ----------
  // Produces a single continuous-stroke loop path, echoing the wordmark's own line logic.
  window.spiro = function(R, r, d, turns, steps, cx, cy, scale){
    turns = turns || 1; steps = steps || 900; cx = cx || 0; cy = cy || 0; scale = scale || 1;
    var pts = [];
    var max = Math.PI * 2 * turns;
    for(var i=0; i<=steps; i++){
      var t = (i/steps) * max;
      var x = (R-r)*Math.cos(t) + d*Math.cos(((R-r)/r)*t);
      var y = (R-r)*Math.sin(t) - d*Math.sin(((R-r)/r)*t);
      pts.push([cx + x*scale, cy + y*scale]);
    }
    var dstr = 'M ' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for(var j=1;j<pts.length;j++){ dstr += ' L ' + pts[j][0].toFixed(1) + ',' + pts[j][1].toFixed(1); }
    return dstr;
  };

  // Logarithmic spiral (nautilus-style), returns a 'd' path of concentric arcs
  window.logSpiral = function(turns, a, b, steps, cx, cy){
    turns = turns || 4; a = a || 2; b = b || 0.28; steps = steps || 400; cx = cx || 0; cy = cy || 0;
    var pts = [];
    var max = Math.PI * 2 * turns;
    for(var i=0;i<=steps;i++){
      var t = (i/steps)*max;
      var rad = a * Math.exp(b*t);
      pts.push([cx + rad*Math.cos(t), cy + rad*Math.sin(t)]);
    }
    var dstr = 'M ' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for(var j=1;j<pts.length;j++){ dstr += ' L ' + pts[j][0].toFixed(1) + ',' + pts[j][1].toFixed(1); }
    return dstr;
  };

  // Auto-populate any [data-spiro] svg path elements found on the page
  document.querySelectorAll('[data-spiro]').forEach(function(el){
    var cfg = el.getAttribute('data-spiro').split(',').map(Number);
    var d = window.spiro(cfg[0], cfg[1], cfg[2], cfg[3], 700, cfg[4]||0, cfg[5]||0, cfg[6]||1);
    el.setAttribute('d', d);
  });
  document.querySelectorAll('[data-logspiral]').forEach(function(el){
    var cfg = el.getAttribute('data-logspiral').split(',').map(Number);
    var d = window.logSpiral(cfg[0], cfg[1], cfg[2], 500, cfg[3]||0, cfg[4]||0);
    el.setAttribute('d', d);
  });
})();
