window.preview = (() => {
  return {
    /**
     * Update the page title with an issue number
     * @param {string} value
     */
    setIssueNumber(value) {
      /** @type {HTMLElement} */
      const node = document.head.querySelector('title');
      node.textContent = node.textContent.replace('?', value);
    },

    /**
     * Add a subdirectory link
     * @param {string} dir
     */
    addDirectory(dir) {
      const [, base, name] = dir.split('/');
      const sectionList = document.querySelector(`#${base} .list`);
      if (!sectionList) {
        return;
      }

      const template = /** @type {HTMLTemplateElement} */ (document.querySelector('template#section-link'));
      const fragment = /** @type {DocumentFragment} */ (template.content.cloneNode(true));

      const listEl = /** @type {HTMLElement} */ (fragment.querySelector('.item'));
      listEl.dataset.sortKey = name;

      const linkEl = /** @type {HTMLAnchorElement} */ (fragment.querySelector('a.link'));
      linkEl.href = `${base}/${name}/index.html`;
      linkEl.textContent = name;

      /** @type {Element | null} */
      let nextEl = null;
      for (const child of sectionList.children) {
        const sortKey = /** @type {HTMLElement} */ (child).dataset.sortKey;
        if (sortKey && sortKey > name) {
          nextEl = child;
          break;
        }
      }

      sectionList.insertBefore(listEl, nextEl);
      sectionList.parentElement.classList.remove('empty');
    },
  };
})();
