const API_URL =
  "https://nesokhean.github.io/api/";
const COURSES = [
  {
    id: 'c1',
    type: 'course',
    title: 'HTML & CSS Masterclass',
    instructor: 'Sarah Johnson',
    cat: 'Web Development',
    img: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg',
    rating: 4.8,
    reviews: 2341,
    price: 29.99,
    orig: 89.99,
    badge: 'Bestseller',
    bc: 'amber',
    level: 'Beginner',
    dur: '24 hrs',
    lessons: 128,
  },

  {
    id: 'c2',
    type: 'course',
    title: 'JavaScript: Beginner to Advanced',
    instructor: 'Marcus Chen',
    cat: 'JavaScript',
    img: 'https://m.media-amazon.com/images/I/61ZxqBT1dvL._UF1000,1000_QL80_.jpg',
    rating: 4.9,
    reviews: 5872,
    price: 49.99,
    orig: 129.99,
    badge: 'Top Rated',
    bc: 'emerald',
    level: 'All Levels',
    dur: '52 hrs',
    lessons: 312,
  },

  {
    id: 'c3',
    type: 'course',
    title: 'Tailwind CSS Bootstrap',
    instructor: 'Priya Sharma',
    cat: 'Web Development',
    img: 'https://webmobtechcdn.nyc3.cdn.digitaloceanspaces.com/wmt_v4/2021/04/From-Bootstrap-to-Tailwind-CSS-webmob-technoogies.png',
    rating: 4.7,
    reviews: 1893,
    price: 34.99,
    orig: 99.99,
    badge: 'New',
    bc: 'sky',
    level: 'Intermediate',
    dur: '18 hrs',
    lessons: 96,
  },

  {
    id: 'c4',
    type: 'course',
    title: 'Vue JS Complete Laravel',
    instructor: 'Alex Rivera',
    cat: 'Vue',
    img: 'https://blog.vueschool.io/wp-content/uploads/2024/01/VS_Articles_Using_Vue_with_Laravel_1.png',
    rating: 4.8,
    reviews: 3214,
    price: 44.99,
    orig: 119.99,
    badge: 'Popular',
    bc: 'violet',
    level: 'Intermediate',
    dur: '38 hrs',
    lessons: 220,
  },

  {
    id: 'c5',
    type: 'course',
    title: 'React Frontend Course',
    instructor: 'Emma Williams',
    cat: 'React',
    img: 'https://www.ropstam.com/wp-content/uploads/2024/03/how-to-create-new-react-native-project.jpg',
    rating: 4.9,
    reviews: 7109,
    price: 54.99,
    orig: 149.99,
    badge: 'Bestseller',
    bc: 'amber',
    level: 'All Levels',
    dur: '64 hrs',
    lessons: 380,
  },

  {
    id: 'c6',
    type: 'course',
    title: 'Node.js API Development',
    instructor: 'Daniel Scott',
    cat: 'Backend',
    img: 'https://miro.medium.com/v2/resize:fit:1200/1*7r3N5M4K6m4S8sPz6N8l8Q.jpeg',
    rating: 4.8,
    reviews: 2870,
    price: 39.99,
    orig: 109.99,
    badge: 'Trending',
    bc: 'emerald',
    level: 'Intermediate',
    dur: '42 hrs',
    lessons: 240,
  },

  {
    id: 'c7',
    type: 'course',
    title: 'Python for Beginners',
    instructor: 'Lisa Wong',
    cat: 'Python',
    img: 'https://i.ytimg.com/vi/qQEigNVHlX8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDDLQL0BECFqTvIoxu8MXhNGJ_PTw',
    rating: 4.9,
    reviews: 4500,
    price: 24.99,
    orig: 79.99,
    badge: 'Hot',
    bc: 'amber',
    level: 'Beginner',
    dur: '28 hrs',
    lessons: 160,
  },

  {
    id: 'c8',
    type: 'course',
    title: 'Next.js Fullstack Bootcamp',
    instructor: 'Noah Martinez',
    cat: 'Next.js',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    rating: 4.8,
    reviews: 3901,
    price: 59.99,
    orig: 159.99,
    badge: 'Editor Choice',
    bc: 'violet',
    level: 'Advanced',
    dur: '72 hrs',
    lessons: 410,
  },

  {
    id: 'c9',
    type: 'course',
    title: 'MongoDB Database Essentials',
    instructor: 'Sophia Lee',
    cat: 'Database',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    rating: 4.7,
    reviews: 2100,
    price: 19.99,
    orig: 59.99,
    badge: 'Popular',
    bc: 'sky',
    level: 'Beginner',
    dur: '16 hrs',
    lessons: 84,
  },

  {
    id: 'c10',
    type: 'course',
    title: 'TypeScript Complete Guide',
    instructor: 'Ryan Cooper',
    cat: 'TypeScript',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    rating: 4.9,
    reviews: 5200,
    price: 44.99,
    orig: 119.99,
    badge: 'Top Rated',
    bc: 'emerald',
    level: 'All Levels',
    dur: '46 hrs',
    lessons: 260,
  },
];



const BOOKS = [
  {
    id: 'b1',
    type: 'book',
    title: 'JavaScript: The Definitive Guide',
    author: 'David Flanagan',
    cat: 'JavaScript',
    cover: 'https://m.media-amazon.com/images/I/91hUer84PpL._AC_UF350,350_QL50_.jpg',
    pages: 706,
    rating: 4.9,
    reviews: 3841,
    price: 24.99,
    orig: 49.99,
    badge: 'Classic',
    bc: 'amber',
    color: '#F59E0B',
    desc: 'The complete reference for JS developers.',
  },

  {
    id: 'b2',
    type: 'book',
    title: 'Learning React',
    author: 'Alex Banks & Eve Porcello',
    cat: 'React',
    cover: 'https://m.media-amazon.com/images/I/91uFdkCJmAL._UF1000,1000_QL80_.jpg',
    pages: 310,
    rating: 4.7,
    reviews: 2210,
    price: 19.99,
    orig: 39.99,
    badge: 'Bestseller',
    bc: 'sky',
    color: '#06B6D4',
    desc: 'React Hooks and state management.',
  },

  {
    id: 'b3',
    type: 'book',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    cat: 'JavaScript',
    cover: 'https://eloquentjavascript.net/img/cover.jpg',
    pages: 472,
    rating: 4.8,
    reviews: 3300,
    price: 18.99,
    orig: 34.99,
    badge: 'Popular',
    bc: 'emerald',
    color: '#10B981',
    desc: 'Modern introduction to programming.',
  },

  {
    id: 'b4',
    type: 'book',
    title: 'You Don’t Know JS Yet',
    author: 'Kyle Simpson',
    cat: 'JavaScript',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
    pages: 420,
    rating: 4.9,
    reviews: 4100,
    price: 22.99,
    orig: 44.99,
    badge: 'Top Rated',
    bc: 'violet',
    color: '#8B5CF6',
    desc: 'Deep dive into JavaScript internals.',
  },

  {
    id: 'b5',
    type: 'book',
    title: 'CSS Secrets',
    author: 'Lea Verou',
    cat: 'CSS',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/71cJ0cJQ7-L.jpg',
    pages: 404,
    rating: 4.7,
    reviews: 1900,
    price: 20.99,
    orig: 39.99,
    badge: 'New',
    bc: 'amber',
    color: '#F59E0B',
    desc: 'Better web design through CSS techniques.',
  },

  {
    id: 'b6',
    type: 'book',
    title: 'Node.js Design Patterns',
    author: 'Mario Casciaro',
    cat: 'Node.js',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/91asIC1fRwL.jpg',
    pages: 526,
    rating: 4.8,
    reviews: 2800,
    price: 27.99,
    orig: 54.99,
    badge: 'Trending',
    bc: 'sky',
    color: '#06B6D4',
    desc: 'Scalable backend architecture patterns.',
  },

  {
    id: 'b7',
    type: 'book',
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    cat: 'Python',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/91F7Kzx10-L.jpg',
    pages: 544,
    rating: 4.9,
    reviews: 5000,
    price: 25.99,
    orig: 49.99,
    badge: 'Bestseller',
    bc: 'emerald',
    color: '#10B981',
    desc: 'Fast-paced Python learning guide.',
  },

  {
    id: 'b8',
    type: 'book',
    title: 'Fullstack React',
    author: 'Accomazzo Team',
    cat: 'React',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81dDwAzxtrL.jpg',
    pages: 776,
    rating: 4.8,
    reviews: 2600,
    price: 29.99,
    orig: 59.99,
    badge: 'Popular',
    bc: 'violet',
    color: '#8B5CF6',
    desc: 'Complete React and Redux guide.',
  },

  {
    id: 'b9',
    type: 'book',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    cat: 'Programming',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL.jpg',
    pages: 464,
    rating: 4.9,
    reviews: 8000,
    price: 32.99,
    orig: 69.99,
    badge: 'Classic',
    bc: 'amber',
    color: '#F59E0B',
    desc: 'Principles for writing clean code.',
  },

  {
    id: 'b10',
    type: 'book',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    cat: 'Software Engineering',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/71f1jieYHNL.jpg',
    pages: 352,
    rating: 4.9,
    reviews: 6100,
    price: 28.99,
    orig: 59.99,
    badge: 'Must Read',
    bc: 'sky',
    color: '#06B6D4',
    desc: 'Career and coding best practices.',
  },
];



const VIDEOS = [
  {
    id: 'v1',
    type: 'video',
    title: 'React Hooks Deep Dive',
    instructor: 'Emma Williams',
    cat: 'React',
    thumb: 'https://img.youtube.com/vi/dGcsHMXbSOA/maxresdefault.jpg',
    dur: '1:42:18',
    views: '124K',
    rating: 4.9,
    reviews: 3210,
    price: 14.99,
    orig: 39.99,
    badge: 'Top Video',
    bc: 'amber',
    yt: 'dGcsHMXbSOA',
    tags: ['React', 'Hooks'],
  },

  {
    id: 'v2',
    type: 'video',
    title: 'JavaScript Promises & Async/Await',
    instructor: 'Marcus Chen',
    cat: 'JavaScript',
    thumb: 'https://img.youtube.com/vi/_8gHHBlbziw/maxresdefault.jpg',
    dur: '58:44',
    views: '89K',
    rating: 4.8,
    reviews: 2156,
    price: 9.99,
    orig: 24.99,
    badge: 'Popular',
    bc: 'emerald',
    yt: '_8gHHBlbziw',
    tags: ['JavaScript', 'Async'],
  },

  {
    id: 'v3',
    type: 'video',
    title: 'Vue 3 Crash Course',
    instructor: 'Alex Rivera',
    cat: 'Vue',
    thumb: 'https://img.youtube.com/vi/qZXt1Aom3Cs/maxresdefault.jpg',
    dur: '2:10:20',
    views: '140K',
    rating: 4.9,
    reviews: 2900,
    price: 12.99,
    orig: 34.99,
    badge: 'Trending',
    bc: 'violet',
    yt: 'qZXt1Aom3Cs',
    tags: ['Vue', 'Frontend'],
  },

  {
    id: 'v4',
    type: 'video',
    title: 'Tailwind CSS Full Course',
    instructor: 'Priya Sharma',
    cat: 'CSS',
    thumb: 'https://img.youtube.com/vi/lCxcTsOHrjo/maxresdefault.jpg',
    dur: '3:22:15',
    views: '200K',
    rating: 4.8,
    reviews: 4100,
    price: 15.99,
    orig: 44.99,
    badge: 'Bestseller',
    bc: 'sky',
    yt: 'lCxcTsOHrjo',
    tags: ['Tailwind', 'CSS'],
  },

  {
    id: 'v5',
    type: 'video',
    title: 'Next.js Authentication Tutorial',
    instructor: 'Noah Martinez',
    cat: 'Next.js',
    thumb: 'https://img.youtube.com/vi/1WmNXEVia8I/maxresdefault.jpg',
    dur: '1:18:12',
    views: '98K',
    rating: 4.7,
    reviews: 1800,
    price: 10.99,
    orig: 29.99,
    badge: 'New',
    bc: 'amber',
    yt: '1WmNXEVia8I',
    tags: ['Next.js', 'Auth'],
  },

  {
    id: 'v6',
    type: 'video',
    title: 'Python Automation Projects',
    instructor: 'Lisa Wong',
    cat: 'Python',
    thumb: 'https://img.youtube.com/vi/s8XjEuplx_U/maxresdefault.jpg',
    dur: '2:44:09',
    views: '167K',
    rating: 4.9,
    reviews: 3900,
    price: 13.99,
    orig: 36.99,
    badge: 'Top Rated',
    bc: 'emerald',
    yt: 's8XjEuplx_U',
    tags: ['Python', 'Automation'],
  },

  {
    id: 'v7',
    type: 'video',
    title: 'MongoDB Complete Tutorial',
    instructor: 'Sophia Lee',
    cat: 'Database',
    thumb: 'https://img.youtube.com/vi/ofme2o29ngU/maxresdefault.jpg',
    dur: '1:55:00',
    views: '112K',
    rating: 4.8,
    reviews: 2450,
    price: 11.99,
    orig: 31.99,
    badge: 'Popular',
    bc: 'violet',
    yt: 'ofme2o29ngU',
    tags: ['MongoDB', 'Database'],
  },

  {
    id: 'v8',
    type: 'video',
    title: 'Node.js REST API Build',
    instructor: 'Daniel Scott',
    cat: 'Backend',
    thumb: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg',
    dur: '2:08:45',
    views: '143K',
    rating: 4.9,
    reviews: 3100,
    price: 14.99,
    orig: 42.99,
    badge: 'Editor Pick',
    bc: 'amber',
    yt: 'Oe421EPjeBE',
    tags: ['Node.js', 'API'],
  },

  {
    id: 'v9',
    type: 'video',
    title: 'TypeScript in 100 Minutes',
    instructor: 'Ryan Cooper',
    cat: 'TypeScript',
    thumb: 'https://img.youtube.com/vi/zQnBQ4tB3ZA/maxresdefault.jpg',
    dur: '1:40:00',
    views: '120K',
    rating: 4.8,
    reviews: 2700,
    price: 9.99,
    orig: 27.99,
    badge: 'Fast Track',
    bc: 'sky',
    yt: 'zQnBQ4tB3ZA',
    tags: ['TypeScript', 'TS'],
  },

  {
    id: 'v10',
    type: 'video',
    title: 'Git & GitHub Mastery',
    instructor: 'Carlos Mendes',
    cat: 'Tools',
    thumb: 'https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg',
    dur: '1:25:11',
    views: '250K',
    rating: 4.9,
    reviews: 5100,
    price: 8.99,
    orig: 19.99,
    badge: 'Must Watch',
    bc: 'emerald',
    yt: 'RGOj5yH7evk',
    tags: ['Git', 'GitHub'],
  },
];



const TESTIMONIALS = [
  {
    name: 'Jessica Park',
    role: 'Frontend Dev @ Google',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    text: 'LearnFlow transformed my career completely.',
    item: 'React Frontend Course',
  },

  {
    name: 'Carlos Mendes',
    role: 'Full Stack Eng @ Stripe',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
    text: 'Outstanding courses and amazing video quality.',
    item: 'Node.js Backend Course',
  },

  {
    name: 'Emily Stone',
    role: 'UI Designer @ Adobe',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    text: 'Tailwind CSS course improved my workflow.',
    item: 'Tailwind CSS Bootcamp',
  },

  {
    name: 'Michael Brown',
    role: 'Software Engineer @ Amazon',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    rating: 5,
    text: 'The JavaScript course is incredibly detailed.',
    item: 'JavaScript Masterclass',
  },

  {
    name: 'Sophia Turner',
    role: 'Frontend Engineer @ Netflix',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    rating: 5,
    text: 'Best React learning platform online.',
    item: 'React Hooks Deep Dive',
  },

  {
    name: 'Daniel Kim',
    role: 'Backend Dev @ Spotify',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    rating: 5,
    text: 'Node.js lessons helped me build APIs fast.',
    item: 'Node.js API Development',
  },

  {
    name: 'Olivia White',
    role: 'Web Developer @ Shopify',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    rating: 5,
    text: 'The books and courses are easy to follow.',
    item: 'Learning React',
  },

  {
    name: 'James Wilson',
    role: 'Tech Lead @ Microsoft',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    rating: 5,
    text: 'Practical examples and excellent instructors.',
    item: 'Vue JS Complete Laravel',
  },

  {
    name: 'Ava Martinez',
    role: 'Frontend Dev @ Airbnb',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    rating: 5,
    text: 'Loved the TypeScript and Next.js content.',
    item: 'TypeScript Complete Guide',
  },

  {
    name: 'Ethan Clark',
    role: 'Software Engineer @ Meta',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    rating: 5,
    text: 'Highly recommended for beginner developers.',
    item: 'Python for Beginners',
  },
];

// ── STATE ──────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('lf_cart_v2')||'[]');
let activeTab = 'courses';
let activeFilter = 'All';
let searchQ = '';
let slideIdx = 0;
let slideTimer;

// ── LOADER ────────────────────────────────────────────────────
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('out');
    initReveal();
    renderAll();
    renderTesti();
    updateCartUI();
    startCounters();
  },1600);
});

// ── THEME ─────────────────────────────────────────────────────
const savedTheme=localStorage.getItem('lf_theme')||'dark';
document.documentElement.setAttribute('data-theme',savedTheme);
function toggleTheme(){
  const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('lf_theme',t);
}

// ── NAVBAR ────────────────────────────────────────────────────
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>30);
  document.getElementById('btt').classList.toggle('show',scrollY>400);
});

// ── MOBILE MENU ───────────────────────────────────────────────
let mmOpen=false;
function toggleMMenu(){
  mmOpen=!mmOpen;
  document.getElementById('mmenu').classList.toggle('open',mmOpen);
  document.getElementById('ham-open').style.display=mmOpen?'none':'block';
  document.getElementById('ham-close').style.display=mmOpen?'block':'none';
}
function closeMMenu(){
  mmOpen=false;
  document.getElementById('mmenu').classList.remove('open');
  document.getElementById('ham-open').style.display='block';
  document.getElementById('ham-close').style.display='none';
}

// ── TAB SWITCHING ─────────────────────────────────────────────
function switchTab(tab,btn){
  activeTab=tab;
  activeFilter='All';
  searchQ='';
  const si=document.getElementById('store-search');
  if(si)si.value='';

  // toggle tab content
  ['courses','books','videos'].forEach(t=>{
    const el=document.getElementById('tab-'+t);
    if(el)el.style.display=t===tab?'block':'none';
  });
  // sync all pill/tab buttons
  document.querySelectorAll('[data-tab]').forEach(b=>{
    b.classList.toggle('active',b.dataset.tab===tab);
  });
  document.querySelectorAll('[data-tabnav]').forEach(b=>{
    b.classList.toggle('active',b.dataset.tabnav===tab);
  });
  // reset filters
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter==='All'));

  renderActive();
  document.getElementById('store').scrollIntoView({behavior:'smooth'});
}

// ── FILTER & SEARCH ───────────────────────────────────────────
function setFilter(f,btn){
  activeFilter=f;
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===f));
  renderActive();
}
function doStoreSearch(v){
  searchQ=v.toLowerCase().trim();
  renderActive();
}
function doHeroSearch(){
  searchQ=document.getElementById('hero-search').value.toLowerCase().trim();
  renderActive();
  document.getElementById('store').scrollIntoView({behavior:'smooth'});
}
function heroTag(t){
  document.getElementById('hero-search').value=t;
  searchQ=t.toLowerCase();
  renderActive();
  document.getElementById('store').scrollIntoView({behavior:'smooth'});
}
function filterAndGo(cat){
  activeFilter=cat;
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===cat));
  renderActive();
  document.getElementById('store').scrollIntoView({behavior:'smooth'});
}

function getFiltered(arr){
  return arr.filter(i=>{
    const mc=activeFilter==='All'||i.cat===activeFilter;
    const ms=!searchQ||i.title.toLowerCase().includes(searchQ)||(i.instructor||i.author||'').toLowerCase().includes(searchQ)||i.cat.toLowerCase().includes(searchQ);
    return mc&&ms;
  });
}
function renderActive(){
  if(activeTab==='courses')renderCourses();
  else if(activeTab==='books')renderBooks();
  else renderVideos();
}
function renderAll(){renderCourses();renderBooks();renderVideos();}

// ── HELPERS ───────────────────────────────────────────────────
function stars(r){return '★'.repeat(Math.floor(r))+(r%1>=.5?'☆':'');}
function fmtR(n){return n>=1000?(n/1000).toFixed(1)+'k':n;}
function inCart(id){return cart.some(c=>c.id===id);}
function pct(p,o){return Math.round((1-p/o)*100);}

// ── RENDER COURSES ────────────────────────────────────────────
function renderCourses(){
  const g=document.getElementById('courses-grid');
  const f=getFiltered(COURSES);
  toggleNoRes(f.length===0&&activeTab==='courses');
  g.innerHTML=f.map(c=>`
  <div class="card" style="display:flex;flex-direction:column">
    <div class="card-img-wrap" style="height:185px">
      <img class="card-img" src="${c.img}" style="height:185px" alt="${c.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=185&fit=crop'">
      <div style="position:absolute;top:.6rem;left:.6rem;display:flex;gap:.375rem">
        <span class="badge badge-${c.bc}">${c.badge}</span>
        <span class="badge" style="background:rgba(0,0,0,.6);color:#fff">${pct(c.price,c.orig)}% OFF</span>
      </div>
      <div style="position:absolute;top:.6rem;right:.6rem;background:rgba(0,0,0,.65);border-radius:.4rem;padding:.2rem .5rem;font-size:.7rem;font-weight:600;color:#fff;backdrop-filter:blur(4px)">${c.level}</div>
    </div>
    <div style="padding:1.1rem;flex:1;display:flex;flex-direction:column;gap:.5rem">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:.72rem;font-weight:700;color:var(--accent);background:rgba(124,111,255,.12);padding:.15rem .5rem;border-radius:.35rem">${c.cat}</span>
        <span style="font-size:.7rem;color:var(--txt2)">📚 ${c.lessons} lessons</span>
      </div>
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;line-height:1.35;color:var(--txt)">${c.title}</h3>
      <p style="font-size:.78rem;color:var(--txt2)">by ${c.instructor}</p>
      <div style="display:flex;align-items:center;gap:.35rem">
        <span class="stars" style="font-size:.8rem">${stars(c.rating)}</span>
        <span style="font-size:.8rem;font-weight:700;color:#F59E0B">${c.rating}</span>
        <span style="font-size:.72rem;color:var(--txt2)">(${fmtR(c.reviews)})</span>
      </div>
      <div style="font-size:.72rem;color:var(--txt2)">⏱ ${c.dur}</div>
      <div style="margin-top:auto;padding-top:.75rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.4rem">
        <div>
          <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.15rem;color:var(--accent)">$${c.price}</span>
          <span style="font-size:.78rem;text-decoration:line-through;color:var(--txt2);margin-left:.35rem">$${c.orig}</span>
        </div>
        <div style="display:flex;gap:.35rem">
          <button class="btn btn-s btn-xs" onclick="showDetail('${c.id}')">Details</button>
          <button id="cb-${c.id}" class="btn btn-xs ${inCart(c.id)?'btn-g':'btn-p'}" onclick="toggleCart('${c.id}')">${inCart(c.id)?'✓ Added':'+ Cart'}</button>
        </div>
      </div>
    </div>
  </div>`).join('');
  observeNew(g);
}

// ── RENDER BOOKS ──────────────────────────────────────────────
function renderBooks(){
  const g=document.getElementById('books-grid');
  const f=getFiltered(BOOKS);
  toggleNoRes(f.length===0&&activeTab==='books');
  g.innerHTML=f.map(b=>`
  <div class="book-card">
    <div class="book-cover" style="background:linear-gradient(145deg,${b.color}22,${b.color}08);border-bottom:1px solid var(--border)">
      <img src="${b.cover}" style="height:160px;width:110px;object-fit:cover;border-radius:.5rem;box-shadow:4px 4px 20px rgba(0,0,0,.4);transition:transform .3s" onmouseover="this.style.transform='rotate(-3deg) scale(1.04)'" onmouseout="this.style.transform=''" alt="${b.title}" loading="lazy">
      <div style="position:absolute;top:.6rem;left:.6rem"><span class="badge badge-${b.bc}">${b.badge}</span></div>
      <div style="position:absolute;bottom:.6rem;right:.6rem;background:rgba(0,0,0,.65);border-radius:.375rem;padding:.15rem .5rem;font-size:.68rem;font-weight:600;color:#fff">${b.pages} pages</div>
    </div>
    <div style="padding:1.1rem;display:flex;flex-direction:column;gap:.45rem;flex:1">
      <span style="font-size:.68rem;font-weight:700;color:${b.color};background:${b.color}18;padding:.15rem .5rem;border-radius:.3rem;display:inline-block;width:fit-content">${b.cat}</span>
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;line-height:1.35;color:var(--txt)">${b.title}</h3>
      <p style="font-size:.75rem;color:var(--txt2)">by ${b.author}</p>
      <p style="font-size:.78rem;color:var(--txt3);line-height:1.5">${b.desc}</p>
      <div style="display:flex;align-items:center;gap:.35rem">
        <span class="stars" style="font-size:.78rem">${stars(b.rating)}</span>
        <span style="font-size:.78rem;font-weight:700;color:#F59E0B">${b.rating}</span>
        <span style="font-size:.7rem;color:var(--txt2)">(${fmtR(b.reviews)})</span>
      </div>
      <div style="margin-top:auto;padding-top:.75rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:.4rem;flex-wrap:wrap">
        <div>
          <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:var(--accent)">$${b.price}</span>
          <span style="font-size:.75rem;text-decoration:line-through;color:var(--txt2);margin-left:.3rem">$${b.orig}</span>
        </div>
        <div style="display:flex;gap:.35rem">
          <button class="btn btn-s btn-xs" onclick="showDetail('${b.id}')">Preview</button>
          <button id="cb-${b.id}" class="btn btn-xs ${inCart(b.id)?'btn-g':'btn-p'}" onclick="toggleCart('${b.id}')">${inCart(b.id)?'✓ Added':'+ Cart'}</button>
        </div>
      </div>
    </div>
  </div>`).join('');
  observeNew(g);
}

// ── RENDER VIDEOS ─────────────────────────────────────────────
function renderVideos(){
  const g=document.getElementById('videos-grid');
  const f=getFiltered(VIDEOS);
  toggleNoRes(f.length===0&&activeTab==='videos');
  g.innerHTML=f.map(v=>`
  <div class="vid-card" onclick="openVidModal('${v.id}')">
    <div class="vid-thumb">
      <img src="${v.thumb}" alt="${v.title}" style="height:170px" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=170&fit=crop'">
      <div class="play-btn"><div class="play-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></div></div>
      <div class="vid-duration">${v.dur}</div>
      <div style="position:absolute;top:.6rem;left:.6rem;display:flex;gap:.35rem">
        <span class="badge badge-${v.bc}">${v.badge}</span>
      </div>
    </div>
    <div style="padding:1.1rem;display:flex;flex-direction:column;gap:.45rem">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:.72rem;font-weight:700;color:var(--accent);background:rgba(124,111,255,.12);padding:.15rem .5rem;border-radius:.35rem">${v.cat}</span>
        <span style="font-size:.7rem;color:var(--txt2)">👁 ${v.views} views</span>
      </div>
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;line-height:1.35;color:var(--txt)">${v.title}</h3>
      <p style="font-size:.75rem;color:var(--txt2)">by ${v.instructor}</p>
      <div style="display:flex;align-items:center;gap:.35rem">
        <span class="stars" style="font-size:.78rem">${stars(v.rating)}</span>
        <span style="font-size:.78rem;font-weight:700;color:#F59E0B">${v.rating}</span>
        <span style="font-size:.7rem;color:var(--txt2)">(${fmtR(v.reviews)})</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.1rem">
        ${v.tags.slice(0,3).map(t=>`<span style="font-size:.65rem;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:.3rem;padding:.1rem .45rem;color:var(--txt2)">${t}</span>`).join('')}
      </div>
      <div style="padding-top:.75rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:.4rem;flex-wrap:wrap;margin-top:auto">
        <div>
          <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:var(--accent)">$${v.price}</span>
          <span style="font-size:.75rem;text-decoration:line-through;color:var(--txt2);margin-left:.3rem">$${v.orig}</span>
        </div>
        <div style="display:flex;gap:.35rem" onclick="event.stopPropagation()">
          <button class="btn btn-s btn-xs" onclick="openVidModal('${v.id}')">▶ Watch</button>
          <button id="cb-${v.id}" class="btn btn-xs ${inCart(v.id)?'btn-g':'btn-p'}" onclick="event.stopPropagation();toggleCart('${v.id}')">${inCart(v.id)?'✓ Added':'+ Cart'}</button>
        </div>
      </div>
    </div>
  </div>`).join('');
  observeNew(g);
}

function toggleNoRes(show){
  const el=document.getElementById('no-res');
  if(el)el.style.display=show?'block':'none';
}

// ── DETAIL MODAL ──────────────────────────────────────────────
function showDetail(id){
  const item=[...COURSES,...BOOKS,...VIDEOS].find(x=>x.id===id);
  if(!item)return;
  const isBook=item.type==='book';
  const isVideo=item.type==='video';
  const isCourse=item.type==='course';
  document.getElementById('modal-content').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;flex-wrap:wrap">
          <span style="font-size:.72rem;font-weight:700;color:var(--accent);background:rgba(124,111,255,.15);padding:.2rem .6rem;border-radius:.375rem">${item.cat}</span>
          <span class="badge badge-${item.bc}">${item.badge}</span>
          ${isBook?`<span style="font-size:.72rem;color:var(--txt2);background:rgba(255,255,255,.05);border:1px solid var(--border);padding:.15rem .5rem;border-radius:.35rem">📖 ${item.pages} pages</span>`:''}
          ${isVideo?`<span style="font-size:.72rem;color:var(--txt2);background:rgba(255,255,255,.05);border:1px solid var(--border);padding:.15rem .5rem;border-radius:.35rem">⏱ ${item.dur}</span>`:''}
          ${isCourse?`<span style="font-size:.72rem;color:var(--txt2);background:rgba(255,255,255,.05);border:1px solid var(--border);padding:.15rem .5rem;border-radius:.35rem">${item.level} · ${item.dur}</span>`:''}
        </div>
        <h2 style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:var(--txt);margin-bottom:.5rem;line-height:1.25">${item.title}</h2>
        <p style="font-size:.85rem;color:var(--txt2);margin-bottom:.875rem">by ${item.instructor||item.author}</p>
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.875rem">
          <span class="stars">${stars(item.rating)}</span>
          <span style="font-weight:700;color:#F59E0B">${item.rating}</span>
          <span style="font-size:.8rem;color:var(--txt2)">(${fmtR(item.reviews)} ratings)</span>
        </div>
        ${isVideo?`<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.875rem">${item.tags.map(t=>`<span style="font-size:.72rem;background:rgba(124,111,255,.12);border:1px solid rgba(124,111,255,.2);border-radius:.375rem;padding:.2rem .55rem;color:var(--accent)">${t}</span>`).join('')}</div>`:''}
      </div>
      <button onclick="closeModal()" style="background:rgba(255,255,255,.07);border:none;color:var(--txt);border-radius:.625rem;padding:.4rem .75rem;font-size:.85rem;font-weight:600;flex-shrink:0">✕ Close</button>
    </div>
    <div style="position:relative;overflow:hidden;border-radius:1rem;margin-bottom:1.5rem;height:200px">
      <img src="${isBook?item.cover:item.img||item.thumb}" style="width:100%;height:100%;object-fit:${isBook?'contain':'cover'};background:var(--bg)" alt="${item.title}">
      ${isVideo?`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4)"><button onclick="closeModal();setTimeout(()=>openVidModal('${item.id}'),200)" style="display:flex;align-items:center;gap:.625rem;background:rgba(124,111,255,.9);color:#fff;border:none;border-radius:2rem;padding:.75rem 1.5rem;font-size:.95rem;font-weight:700;cursor:pointer">▶ Watch Preview</button></div>`:''}
    </div>
    ${isBook?`<p style="font-size:.9rem;color:var(--txt3);line-height:1.7;margin-bottom:1.5rem">${item.desc}</p>`:''}
    ${isCourse?`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem;margin-bottom:1.5rem">
      <div style="background:rgba(124,111,255,.08);border:1px solid rgba(124,111,255,.15);border-radius:.75rem;padding:.875rem;text-align:center"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:var(--accent)">${item.lessons}</div><div style="font-size:.72rem;color:var(--txt2);margin-top:.25rem">Lessons</div></div>
      <div style="background:rgba(56,232,181,.08);border:1px solid rgba(56,232,181,.15);border-radius:.75rem;padding:.875rem;text-align:center"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#38E8B5">${item.dur}</div><div style="font-size:.72rem;color:var(--txt2);margin-top:.25rem">Duration</div></div>
      <div style="background:rgba(255,107,138,.08);border:1px solid rgba(255,107,138,.15);border-radius:.75rem;padding:.875rem;text-align:center"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#FF6B8A">♾️</div><div style="font-size:.72rem;color:var(--txt2);margin-top:.25rem">Lifetime Access</div></div>
      <div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.15);border-radius:.75rem;padding:.875rem;text-align:center"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#F59E0B">🏅</div><div style="font-size:.72rem;color:var(--txt2);margin-top:.25rem">Certificate</div></div>
    </div>`:''}
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;padding-top:1.25rem;border-top:1px solid var(--border)">
      <div>
        <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.75rem;color:var(--accent)">$${item.price}</div>
        <div style="display:flex;align-items:center;gap:.5rem">
          <span style="font-size:.85rem;text-decoration:line-through;color:var(--txt2)">$${item.orig}</span>
          <span style="font-size:.78rem;font-weight:700;color:#38E8B5">${pct(item.price,item.orig)}% off</span>
        </div>
      </div>
      <div style="display:flex;gap:.625rem;flex-wrap:wrap;margin-left:auto">
        <button id="modal-cart-btn" class="btn ${inCart(item.id)?'btn-g':'btn-p'}" onclick="toggleCart('${item.id}');document.getElementById('modal-cart-btn').textContent=inCart('${item.id}')?'✓ Added':'+ Add to Cart';document.getElementById('modal-cart-btn').className='btn '+(inCart('${item.id}')?'btn-g':'btn-p')" style="padding:.7rem 1.4rem">${inCart(item.id)?'✓ Added':'+ Add to Cart'}</button>
        <button class="btn btn-r" onclick="closeModal()" style="padding:.7rem 1.4rem">Buy Now →</button>
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(e){
  if(e&&e.target!==document.getElementById('modal-overlay'))return;
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}

// ── VIDEO MODAL ───────────────────────────────────────────────
function openVidModal(id){
  const v=VIDEOS.find(x=>x.id===id);
  if(!v)return;
  document.getElementById('vid-modal-title').textContent=v.title;
  document.getElementById('vid-modal-sub').textContent=`by ${v.instructor} · ${v.dur} · ${v.views} views`;
  document.getElementById('vid-iframe').src=`https://www.youtube.com/embed/${v.yt}?autoplay=1&rel=0`;
  document.getElementById('vid-modal-tags').innerHTML=v.tags.map(t=>`<span style="font-size:.68rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:.3rem;padding:.2rem .5rem;color:#aaa">${t}</span>`).join('');
  const cb=document.getElementById('vid-cart-btn');
  cb.textContent=inCart(v.id)?'✓ In Cart':'+ Add to Cart';
  cb.className='btn btn-sm '+(inCart(v.id)?'btn-g':'btn-p');
  cb.onclick=()=>{toggleCart(v.id);cb.textContent=inCart(v.id)?'✓ In Cart':'+ Add to Cart';cb.className='btn btn-sm '+(inCart(v.id)?'btn-g':'btn-p');};
  document.getElementById('vid-modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeVidModal(e){
  if(e&&e.target!==document.getElementById('vid-modal-overlay'))return;
  document.getElementById('vid-iframe').src='';
  document.getElementById('vid-modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}

// ── CART ──────────────────────────────────────────────────────
function toggleCart(id){
  const item=[...COURSES,...BOOKS,...VIDEOS].find(x=>x.id===id);
  if(!item)return;
  const idx=cart.findIndex(c=>c.id===id);
  if(idx>-1){
    cart.splice(idx,1);
    toast('Removed from cart','🗑️');
  } else {
    cart.push({id:item.id,title:item.title,price:item.price,orig:item.orig,type:item.type,img:item.img||item.cover||item.thumb,by:item.instructor||item.author});
    toast('Added to cart! 🎉','✅');
  }
  localStorage.setItem('lf_cart_v2',JSON.stringify(cart));
  updateCartUI();
  // refresh button in grid
  const btn=document.getElementById('cb-'+id);
  if(btn){btn.textContent=inCart(id)?'✓ Added':'+ Cart';btn.className='btn btn-xs '+(inCart(id)?'btn-g':'btn-p');}
}

function updateCartUI(){
  const cnt=cart.length;
  const el=document.getElementById('cart-cnt');
  el.textContent=cnt;el.style.display=cnt?'flex':'none';
  document.getElementById('cart-item-count').textContent=cnt+' item'+(cnt!==1?'s':'');
  renderCartDrawer();
}

function renderCartDrawer(){
  const body=document.getElementById('cart-body');
  const total=document.getElementById('cart-total');
  const savings=document.getElementById('cart-savings');
  if(!cart.length){
    body.innerHTML=`<div style="text-align:center;padding:3rem 1rem;color:var(--txt2)"><div style="font-size:2.5rem;margin-bottom:.875rem">🛒</div><p style="font-weight:600;margin-bottom:.35rem">Your cart is empty</p><p style="font-size:.82rem">Add courses, books, or videos to get started!</p></div>`;
    total.textContent='$0.00';savings.textContent='$0.00';return;
  }
  const typeIcon={course:'📚',book:'📖',video:'🎬'};
  const typeColor={course:'#7C6FFF',book:'#38E8B5',video:'#FF6B8A'};
  body.innerHTML=cart.map(item=>`
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=64&h=64&fit=crop'">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:flex-start;gap:.4rem;margin-bottom:.25rem">
          <span class="cart-badge-type" style="background:${typeColor[item.type]}18;color:${typeColor[item.type]}">${typeIcon[item.type]} ${item.type}</span>
        </div>
        <p style="font-size:.82rem;font-weight:600;line-height:1.3;margin-bottom:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.title}</p>
        <p style="font-size:.72rem;color:var(--txt2)">by ${item.by}</p>
        <div style="display:flex;align-items:center;gap:.5rem;margin-top:.4rem">
          <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;color:var(--accent)">$${item.price}</span>
          <span style="font-size:.72rem;text-decoration:line-through;color:var(--txt2)">$${item.orig}</span>
        </div>
      </div>
      <button onclick="toggleCart('${item.id}')" style="background:rgba(255,107,138,.1);border:1px solid rgba(255,107,138,.2);color:#FF6B8A;border-radius:.5rem;padding:.3rem .55rem;font-size:.82rem;flex-shrink:0;align-self:flex-start;transition:all .2s" onmouseover="this.style.background='rgba(255,107,138,.2)'" onmouseout="this.style.background='rgba(255,107,138,.1)'">✕</button>
    </div>`).join('');
  const t=cart.reduce((a,b)=>a+b.price,0);
  const s=cart.reduce((a,b)=>a+(b.orig-b.price),0);
  total.textContent='$'+t.toFixed(2);
  savings.textContent='$'+s.toFixed(2);
}

function openCart(){document.getElementById('cart-drawer').classList.add('open');document.getElementById('cart-overlay').classList.add('open');}
function closeCart(){document.getElementById('cart-drawer').classList.remove('open');document.getElementById('cart-overlay').classList.remove('open');}

document.getElementById('checkout-btn').addEventListener('click',()=>{
  if(!cart.length)return;
  cart=[];localStorage.removeItem('lf_cart_v2');updateCartUI();closeCart();
  toast('Order placed! Check your email. 🎉','🎓');
  renderAll();
});

// ── TESTIMONIALS ──────────────────────────────────────────────
function renderTesti(){
  const track=document.getElementById('testi-track');
  const dots=document.getElementById('testi-dots');
  track.innerHTML=TESTIMONIALS.map(t=>`
    <div class="testi-card">
      <div style="font-size:3.5rem;line-height:1;color:var(--accent);opacity:.25;font-family:Georgia,serif;margin-bottom:.5rem">"</div>
      <p style="font-size:.95rem;line-height:1.75;color:var(--txt2);margin-bottom:1.5rem">${t.text}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.875rem">
        <div style="display:flex;align-items:center;gap:.75rem">
          <img src="${t.avatar}" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid rgba(124,111,255,.4)" alt="${t.name}">
          <div><p style="font-weight:700;font-size:.92rem">${t.name}</p><p style="font-size:.75rem;color:var(--txt2)">${t.role}</p></div>
        </div>
        <div style="text-align:right">
          <div class="stars" style="font-size:.95rem">${'★'.repeat(t.rating)}</div>
          <p style="font-size:.68rem;color:var(--txt2);margin-top:.2rem">on ${t.item}</p>
        </div>
      </div>
    </div>`).join('');
  dots.innerHTML=TESTIMONIALS.map((_,i)=>`<button class="dot${i===0?' active':''}" onclick="goSlide(${i})"></button>`).join('');
  goSlide(0);
  slideTimer=setInterval(()=>goSlide((slideIdx+1)%TESTIMONIALS.length),5500);
}
function goSlide(n){
  slideIdx=n;
  document.getElementById('testi-track').style.transform=`translateX(-${n*100}%)`;
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===n));
}
function prevSlide(){clearInterval(slideTimer);goSlide((slideIdx-1+TESTIMONIALS.length)%TESTIMONIALS.length);slideTimer=setInterval(()=>goSlide((slideIdx+1)%TESTIMONIALS.length),5500);}
function nextSlide(){clearInterval(slideTimer);goSlide((slideIdx+1)%TESTIMONIALS.length);slideTimer=setInterval(()=>goSlide((slideIdx+1)%TESTIMONIALS.length),5500);}

// ── COUNTERS ──────────────────────────────────────────────────
function startCounters(){
  const statsObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.querySelectorAll('[data-count]').forEach(el=>{
        const target=+el.dataset.count,suf=el.dataset.suf||'';
        let cur=0;const inc=target/120;
        const t=setInterval(()=>{
          cur=Math.min(cur+inc,target);
          el.textContent=(cur>=1000?(cur/1000).toFixed(0)+'K':Math.floor(cur))+suf;
          if(cur>=target)clearInterval(t);
        },14);
      });
      statsObs.unobserve(e.target);
    });
  },{threshold:.3});
  const s=document.getElementById('stats');
  if(s)statsObs.observe(s);
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
let revObs;
function initReveal(){
  revObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>revObs.observe(el));
}
function observeNew(container){
  if(!revObs)return;
  container.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>{el.classList.remove('in');revObs.observe(el);});
}

// ── NEWSLETTER ────────────────────────────────────────────────
function submitNL(e){
  e.preventDefault();
  const inp=document.getElementById('nl-email');
  inp.classList.remove('err');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())){
    inp.classList.add('err');inp.focus();return;
  }
  inp.value='';
  toast("You're subscribed! Welcome to LearnFlow. 🎉",'📬');
}

// ── TOAST ─────────────────────────────────────────────────────
let toastT;
function toast(msg,icon='✅'){
  document.getElementById('t-msg').textContent=msg;
  document.getElementById('t-icon').textContent=icon;
  const el=document.getElementById('toast');
  el.classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(()=>el.classList.remove('show'),3200);
}

// ── ESCAPE KEY ────────────────────────────────────────────────
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeModal();
    if(document.getElementById('vid-modal-overlay').classList.contains('open'))closeVidModal();
    closeCart();
  }
});
let music=false;

function beep(f=400,t=0.1){
  const ctx=new (window.AudioContext||window.webkitAudioContext)();
  const o=ctx.createOscillator();
  const g=ctx.createGain();
  o.connect(g);g.connect(ctx.destination);
  o.frequency.value=f;
  g.gain.value=0.1;
  o.start();o.stop(ctx.currentTime+t);
}

function catClick(el){
  el.classList.add('wiggle');
  setTimeout(()=>el.classList.remove('wiggle'),400);
  beep(600);
  confetti({particleCount:30,spread:70});
}

function showLogin(){
  loginBox.style.display="block";
  registerBox.style.display="none";
}

function showRegister(){
  loginBox.style.display="none";
  registerBox.style.display="block";
}

function register(){
  const e=regEmail.value,u=regUser.value,p=regPass.value;

  if(!e||!u||!p) return alert("fill all");

  localStorage.setItem("email",e);
  localStorage.setItem("user",u);
  localStorage.setItem("pass",p);

  showLogin();
  loginUser.value=u;
  loginPass.value=p;
}

function login(){
  if(loginUser.value===localStorage.getItem("user") &&
     loginPass.value===localStorage.getItem("pass")){

    loginBox.style.display="none";
    dashboard.style.display="block";

    welcomeText.innerText="Hello "+loginUser.value;

    confetti({particleCount:80,spread:100});
  }else{
    alert("wrong");
  }
}

function logout(){
  dashboard.style.display="none";
  loginBox.style.display="block";
}

function toggleChat(){
  chatBox.style.display=chatBox.style.display==="flex"?"none":"flex";
}

function sendMsg(){
  chatLog.innerHTML+="<br>👤 "+chatInput.value;
  chatInput.value="";
}

function toggleMusic(){
  music=!music;
  beep(300); beep(500); beep(700);
}

window.onload=()=>{
  const u=localStorage.getItem("user");
  if(u) loginUser.value=u;
}
