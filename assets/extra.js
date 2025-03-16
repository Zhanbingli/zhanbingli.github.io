document.addEventListener('DOMContentLoaded', function() {
  // 添加打字机效果
  const mainTitle = document.querySelector('.md-content__inner h1');
  if (mainTitle && window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const originalText = mainTitle.textContent;
    mainTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        mainTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    typeWriter();
  }
  
  // 添加鼠标悬停动画
  const articleLinks = document.querySelectorAll('.md-content__inner a');
  articleLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });

  // 只在文章页面添加评论系统
  if (document.querySelector('.md-content__inner h1')) {
    // 创建评论区容器
    const commentContainer = document.createElement('div');
    commentContainer.className = 'giscus-comments';
    commentContainer.style.marginTop = '2rem';
    
    // 在文章底部添加评论区标题
    const commentTitle = document.createElement('h2');
    commentTitle.textContent = '评论';
    commentTitle.id = 'comments';
    
    // 将评论区添加到文章底部
    const content = document.querySelector('.md-content__inner');
    content.appendChild(document.createElement('hr'));
    content.appendChild(commentTitle);
    content.appendChild(commentContainer);
    
    // 创建Giscus容器
    const giscusContainer = document.createElement('div');
    giscusContainer.className = 'giscus';
    commentContainer.appendChild(giscusContainer);
    
    // 加载Giscus脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Zhanbingli/zhanbingli.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOOJQuug');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOOJQuus4CoFgI');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    
    document.head.appendChild(script);
  }

  // 返回顶部按钮
  // 创建返回顶部按钮
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" fill="currentColor"/></svg>';
  document.body.appendChild(backToTop);
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // 点击返回顶部
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 添加鼠标点击特效
  document.addEventListener('click', function(e) {
    const heart = document.createElement('div');
    heart.className = 'click-effect';
    heart.style.top = (e.pageY - 10) + 'px';
    heart.style.left = (e.pageX - 10) + 'px';
    
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    heart.style.color = randomColor;
    
    const randomEmoji = ['❤️', '🌟', '✨', '💫', '🎉', '🔥', '👍', '😊'][Math.floor(Math.random() * 8)];
    heart.textContent = randomEmoji;
    
    document.body.appendChild(heart);
    
    setTimeout(function() {
      heart.remove();
    }, 1000);
  });
}); 