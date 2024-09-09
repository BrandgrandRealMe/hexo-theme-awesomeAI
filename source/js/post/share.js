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
