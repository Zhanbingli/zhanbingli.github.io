document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有功能
  initReadingProgressBar();
  initImageZoom();
  initSmoothScroll();
  initCodeCopy();
  detectColorScheme();
});

// 阅读进度条功能
function initReadingProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    progressBar.style.width = scrolled + '%';
    
    // 当滚动超过一定高度时显示返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
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
