document.addEventListener('DOMContentLoaded', () => {
    const promptsContainer = document.getElementById('prompts-container');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    let allPrompts = [];

    // Fetch prompts data
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            allPrompts = data;
            populateCategories(allPrompts);
            renderPrompts(allPrompts);
        })
        .catch(error => console.error('Error fetching prompts:', error));

    // Render prompts on the page
    const renderPrompts = (prompts) => {
        promptsContainer.innerHTML = '';
        if (prompts.length === 0) {
            promptsContainer.innerHTML = '<p class="no-results">No prompts found matching your criteria.</p>';
            return;
        }

        prompts.forEach(prompt => {
            const promptCard = document.createElement('div');
            promptCard.classList.add('prompt-card');
            
            const tagsHtml = prompt.tags.map(tag => `<span class="prompt-tag">${tag}</span>`).join('');
            
            promptCard.innerHTML = `
                <div class="header">
                    <h2>${prompt.title}</h2>
                    <button class="copy-button" data-prompt="${encodeURIComponent(prompt.prompt_text)}">Copy</button>
                </div>
                <p class="prompt-text">${prompt.prompt_text}</p>
                <div class="footer">
                    <div class="prompt-tags">
                        <span class="prompt-tag">${prompt.category}</span>
                        ${tagsHtml}
                    </div>
                    <div class="source">Source: ${prompt.source}</div>
                </div>
            `;
            promptsContainer.appendChild(promptCard);
        });

        // Add event listeners to copy buttons
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const promptText = decodeURIComponent(e.target.dataset.prompt);
                navigator.clipboard.writeText(promptText).then(() => {
                    const confirmation = document.createElement('div');
                    confirmation.classList.add('copy-confirmation');
                    confirmation.textContent = 'Copied!';
                    document.body.appendChild(confirmation);
                    
                    // Animate the confirmation message
                    setTimeout(() => {
                        confirmation.style.opacity = '1';
                    }, 10);
                    setTimeout(() => {
                        confirmation.style.opacity = '0';
                        setTimeout(() => confirmation.remove(), 500);
                    }, 1500);
                });
            });
        });
    };

    // Populate category filter dropdown
    const populateCategories = (prompts) => {
        const categories = [...new Set(prompts.map(p => p.category))];
        categories.sort();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    };

    // Handle search and filter logic
    const filterAndSearch = () => {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredPrompts = allPrompts.filter(prompt => {
            const matchesSearch = searchTerm === '' || 
                                  prompt.title.toLowerCase().includes(searchTerm) || 
                                  prompt.prompt_text.toLowerCase().includes(searchTerm) || 
                                  prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            const matchesCategory = selectedCategory === 'all' || 
                                    prompt.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        renderPrompts(filteredPrompts);
    };

    searchBar.addEventListener('input', filterAndSearch);
    categoryFilter.addEventListener('change', filterAndSearch);

    // Dark mode toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Initial check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
});
