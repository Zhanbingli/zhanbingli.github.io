document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有功能
  initReadingProgressBar();
  initImageZoom();
  initSmoothScroll();
  initCodeCopy();
  detectColorScheme();
  estimateReadingTime();
  addImageLoadingAnimation();
  initMobileToc();
  addCodeCopyButtons();
});

// 阅读进度条功能
function initReadingProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// 图片放大功能
function initImageZoom() {
  // 为文章内容中的所有图片添加缩放功能
  const contentImages = document.querySelectorAll('.md-content img:not(.no-zoom)');
  
  contentImages.forEach(img => {
    // 添加可缩放标识和样式
    img.classList.add('zoomable');
    
    img.addEventListener('click', function() {
      // 创建遮罩层
      const overlay = document.createElement('div');
      overlay.className = 'image-overlay';
      
      // 创建放大的图片
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.className = 'zoomed-image';
      zoomedImg.alt = this.alt;
      
      // 将放大的图片添加到遮罩层
      overlay.appendChild(zoomedImg);
      
      // 点击遮罩层关闭
      overlay.addEventListener('click', function() {
        document.body.removeChild(this);
      });
      
      // 添加到页面
      document.body.appendChild(overlay);
    });
  });
}

// 平滑滚动功能
function initSmoothScroll() {
  // 为所有内部链接添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 70, // 留出顶部导航栏的空间
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 添加返回顶部按钮
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.title = '返回顶部';
  document.body.appendChild(backToTopBtn);
  
  // 点击返回顶部
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 添加返回顶部按钮样式
  const style = document.createElement('style');
  style.textContent = `
    #back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--md-primary-fg-color);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s, transform 0.3s;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    #back-to-top.visible {
      opacity: 0.8;
      transform: translateY(0);
    }
    
    #back-to-top:hover {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}

// 代码块复制功能增强
function initCodeCopy() {
  // MkDocs Material已有代码复制功能，这里增加复制成功的动画效果
  document.querySelectorAll('.md-clipboard').forEach(button => {
    const originalTitle = button.title;
    
    button.addEventListener('click', function() {
      // 变更图标和文字显示复制成功
      this.title = '已复制!';
      
      // 2秒后恢复原来的文字
      setTimeout(() => {
        this.title = originalTitle;
      }, 2000);
    });
  });
}

// 检测系统颜色模式并自动切换
function detectColorScheme() {
  // 检测系统颜色模式
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // 检查用户之前的设置
  const savedTheme = localStorage.getItem('theme');
  
  // 如果用户没有明确设置主题，则根据系统设置自动切换
  if (!savedTheme) {
    document.body.setAttribute('data-md-color-scheme', prefersDarkMode ? 'slate' : 'default');
  }
  
  // 监听系统颜色模式变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // 只有在用户没有明确设置主题的情况下才自动切换
    if (!localStorage.getItem('theme')) {
      document.body.setAttribute('data-md-color-scheme', e.matches ? 'slate' : 'default');
    }
  });
}

// 文章阅读时间估算
function estimateReadingTime() {
  const article = document.querySelector('.md-content article');
  if (!article) return;

  const text = article.textContent;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  const readingTime = document.createElement('span');
  readingTime.className = 'reading-time';
  readingTime.textContent = `${minutes} 分钟阅读`;

  const meta = document.querySelector('.article-meta');
  if (meta) {
    meta.appendChild(readingTime);
  }
}

// 图片加载动画
function addImageLoadingAnimation() {
  const images = document.querySelectorAll('.md-content img');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    img.onload = function() {
      img.style.opacity = '1';
    };
  });
}

// 移动端目录切换
function initMobileToc() {
  const tocToggle = document.createElement('button');
  tocToggle.className = 'toc-toggle';
  tocToggle.innerHTML = '☰';
  document.body.appendChild(tocToggle);

  const toc = document.querySelector('.md-nav--secondary');
  if (!toc) return;

  tocToggle.addEventListener('click', function() {
    toc.classList.toggle('show');
  });
}

// 代码块复制按钮
function addCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.className = 'md-clipboard';
    button.innerHTML = '复制';
    button.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.innerHTML = '已复制！';
        setTimeout(() => {
          button.innerHTML = '复制';
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    });
    block.parentNode.appendChild(button);
  });
}
