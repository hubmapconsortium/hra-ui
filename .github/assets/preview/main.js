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
      const el = template.content.cloneNode(true);
      const linkEl = /** @type {HTMLAnchorElement} */ (el.querySelector('a.link'));
      linkEl.href = `${base}/${name}/index.html`;
      linkEl.textContent = name;

      sectionList.appendChild(el);
      sectionList.parentElement.classList.remove('empty');
    },
  };
})();
