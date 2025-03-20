// 阅读进度条功能
document.addEventListener('DOMContentLoaded', function() {
  // 创建进度条元素
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);

  // 计算阅读进度
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // 相关文章功能
  if (document.querySelector('.md-content article')) {
    createRelatedPosts();
  }

  // 添加目录滚动同步
  addTocHighlighting();
  
  // 返回顶部按钮效果增强
  enhanceScrollToTop();
  
  // 添加图片点击放大功能
  addImageZoom();
});

// 相关文章功能实现
function createRelatedPosts() {
  const currentPath = window.location.pathname;
  if (!currentPath.includes('/blog/') && !currentPath.includes('/tech/') && !currentPath.includes('/life/')) {
    return;
  }

  // 获取当前文章的标签和分类
  const metaTags = Array.from(document.querySelectorAll('meta[property="article:tag"]')).map(el => el.getAttribute('content'));
  
  if (metaTags.length === 0) {
    return;
  }
  
  // 模拟相关文章数据 (实际项目中应从后端或索引中获取)
  // 这里仅作为示例，实际使用时应当获取真实数据
  const relatedArticles = [
    { title: '相关文章示例 1', url: '/blog/posts/example-post-1/', date: '2025-03-15' },
    { title: '相关文章示例 2', url: '/blog/posts/example-post-2/', date: '2025-03-10' },
    { title: '相关文章示例 3', url: '/blog/posts/example-post-3/', date: '2025-03-05' }
  ];

  // 创建相关文章区域
  const relatedPostsSection = document.createElement('div');
  relatedPostsSection.className = 'related-posts';
  
  const relatedTitle = document.createElement('h2');
  relatedTitle.textContent = '相关文章';
  relatedPostsSection.appendChild(relatedTitle);
  
  relatedArticles.forEach(article => {
    const articleItem = document.createElement('a');
    articleItem.className = 'related-post-item';
    articleItem.href = article.url;
    
    articleItem.innerHTML = `
      <div>
        <h3 style="margin: 0; font-size: 1rem;">${article.title}</h3>
        <div style="font-size: 0.8rem; color: rgba(0,0,0,0.54);">${article.date}</div>
      </div>
    `;
    
    relatedPostsSection.appendChild(articleItem);
  });
  
  // 添加到文章底部
  const articleContent = document.querySelector('.md-content article');
  if (articleContent) {
    articleContent.appendChild(relatedPostsSection);
  }
}

// 目录滚动同步
function addTocHighlighting() {
  const tocLinks = document.querySelectorAll('.md-nav--secondary .md-nav__link');
  
  if (tocLinks.length === 0) return;
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    const headings = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    
    // 找到当前可见的标题
    let currentHeading = null;
    for (let i = 0; i < headings.length; i++) {
      const rect = headings[i].getBoundingClientRect();
      if (rect.top <= 100) {
        currentHeading = headings[i];
      } else {
        break;
      }
    }
    
    if (currentHeading) {
      // 移除所有高亮
      tocLinks.forEach(link => {
        link.classList.remove('md-nav__link--active');
      });
      
      // 高亮当前标题对应的目录项
      const currentLink = document.querySelector(`.md-nav__link[href="#${currentHeading.id}"]`);
      if (currentLink) {
        currentLink.classList.add('md-nav__link--active');
      }
    }
  });
}

// 增强返回顶部按钮
function enhanceScrollToTop() {
  const scrollTop = document.querySelector('.md-top');
  
  if (scrollTop) {
    // 使按钮动画更流畅
    scrollTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 添加图片点击放大功能
function addImageZoom() {
  const contentImages = document.querySelectorAll('.md-content img:not(.emoji):not(.twemoji):not(.emojione)');
  
  contentImages.forEach(img => {
    // 添加点击事件
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '9999';
      overlay.style.cursor = 'zoom-out';
      
      const zoomedImg = document.createElement('img');
      zoomedImg.src = img.src;
      zoomedImg.style.maxWidth = '90%';
      zoomedImg.style.maxHeight = '90%';
      zoomedImg.style.objectFit = 'contain';
      zoomedImg.style.boxShadow = 'none';
      zoomedImg.style.transition = 'transform 0.3s ease';
      
      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);
      
      // 点击关闭
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
    });
  });
}
