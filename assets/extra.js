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
  
  // 创建点击效果的样式
  const style = document.createElement('style');
  style.textContent = `
    .click-effect {
      position: fixed;
      pointer-events: none;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: clickEffect 0.8s ease-out forwards;
      z-index: 9999;
    }
    
    @keyframes clickEffect {
      0% {
        width: 0px;
        height: 0px;
        opacity: 0.8;
        background: rgba(var(--md-primary-fg-color--rgb), 0.3);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.5);
      }
      100% {
        width: 100px;
        height: 100px;
        opacity: 0;
        background: rgba(var(--md-primary-fg-color--rgb), 0);
      }
    }

    .emoji-effect {
      position: fixed;
      pointer-events: none;
      font-size: 1.5rem;
      z-index: 9999;
      animation: emojiFloat 1.5s ease-out forwards;
    }
    
    @keyframes emojiFloat {
      0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, calc(-50% - 80px)) scale(1.2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // 添加点击事件监听器
  document.addEventListener('click', function(e) {
    // 创建点击效果元素
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = e.pageX + 'px';
    effect.style.top = e.pageY + 'px';
    document.body.appendChild(effect);
    
    // 创建表情符号效果
    const emoji = document.createElement('div');
    emoji.className = 'emoji-effect';
    emoji.style.left = e.pageX + 'px';
    emoji.style.top = e.pageY + 'px';
    
    // 随机选择表情符号
    const emojis = ['❤️', '🌟', '✨', '💫', '🎉', '🔥', '👍', '😊', '🚀', '💡', '🌈', '🎵', '🌺', '🍀'];
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    document.body.appendChild(emoji);
    
    // 动画结束后移除元素
    setTimeout(() => {
      effect.remove();
      emoji.remove();
    }, 1500);
  });

  // 添加自定义暗黑模式切换按钮
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = `
    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" fill="currentColor"/>
    </svg>
    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z" fill="currentColor"/>
    </svg>
  `;
  document.body.appendChild(themeToggle);

  // 切换暗黑模式
  themeToggle.addEventListener('click', function() {
    const currentScheme = document.querySelector('body').getAttribute('data-md-color-scheme');
    const newScheme = currentScheme === 'default' ? 'slate' : 'default';
    
    // 更新颜色方案
    document.querySelector('body').setAttribute('data-md-color-scheme', newScheme);
    
    // 保存用户偏好
    localStorage.setItem('theme', newScheme);
    
    // 添加切换动画
    themeToggle.classList.add('theme-toggle-animate');
    setTimeout(() => {
      themeToggle.classList.remove('theme-toggle-animate');
    }, 300);
  });

  // 初始化主题
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.querySelector('body').setAttribute('data-md-color-scheme', savedTheme);
  }
}); 