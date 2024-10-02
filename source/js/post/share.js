/* global KEEP */

function initPostShareHelper() {
  KEEP.utils.postShareHelper = {
    postShareHandle() {
      const pageUrl = window.location.href
      const pageTitle = window.document.title

      const shareContainer = document.querySelector('.post-share-container .share-list-wrap')

      shareContainer.querySelectorAll('.share-item').forEach((item) => {
        item.addEventListener('click', () => {
          // X share
          if (item.classList.contains('x')) {
            window.open(`https://x.com/intent/tweet?url=${pageUrl}`)
          }

          // Reddit share
          if (item.classList.contains('reddit')) {
            window.open(`https://reddit.com/submit?url=${pageUrl}`)
          }

          // Pinterest share
          if (item.classList.contains('pinterest')) {
            window.open(`https://pinterest.com/pin/create/link/?url=${pageUrl}`)
          }

          // Pinterest share
          if (item.classList.contains('bluesky')) {
            window.open(`https://bsky.app/intent/compose?text=${pageUrl}`)
          }

        })
      })
    }
  }

  if (KEEP.theme_config.post?.share === true) {
    KEEP.utils.postShareHelper.postShareHandle()
  }
}

if (KEEP.theme_config.pjax?.enable === true && KEEP.utils) {
  initPostShareHelper()
} else {
  window.addEventListener('DOMContentLoaded', initPostShareHelper)
}
