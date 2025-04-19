document.addEventListener('DOMContentLoaded', function() {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const dashboardContainer = document.getElementById('dashboardContainer');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation - in a real app, you would validate with server
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Hide login, show dashboard
                loginContainer.style.display = 'none';
                dashboardContainer.style.display = 'block';
                
                // Initialize charts
                initCharts();
                
                // Store login state (in a real app, use proper authentication)
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('Please enter both username and password');
            }
        });
    }
    
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        initCharts();
    }
    
    // Toggle sidebar collapse
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Initialize Charts
    function initCharts() {
        // Delivery Performance Chart
        const deliveryCtx = document.getElementById('deliveryChart').getContext('2d');
        const deliveryChart = new Chart(deliveryCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Completed Deliveries',
                    data: [120, 190, 170, 220, 240, 280, 310, 290, 330, 350, 380, 400],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }, {
                    label: 'Failed Deliveries',
                    data: [20, 30, 25, 35, 40, 30, 25, 35, 30, 25, 20, 15],
                    borderColor: '#f72585',
                    backgroundColor: 'rgba(247, 37, 133, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
        
        // Region Distribution Chart
        const regionCtx = document.getElementById('regionChart').getContext('2d');
        const regionChart = new Chart(regionCtx, {
            type: 'doughnut',
            data: {
                labels: ['North', 'South', 'East', 'West', 'Central'],
                datasets: [{
                    data: [25, 20, 15, 30, 10],
                    backgroundColor: [
                        '#4361ee',
                        '#4cc9f0',
                        '#f8961e',
                        '#f72585',
                        '#3f37c9'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                let value = context.raw || 0;
                                let total = context.dataset.data.reduce((a, b) => a + b, 0);
                                let percentage = Math.round((value / total) * 100);
                                return `${label}: ${percentage}% (${value})`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
        
        // Make charts responsive on window resize
        window.addEventListener('resize', function() {
            deliveryChart.resize();
            regionChart.resize();
        });
    }
    
    // Todo List - Add new item
    const todoAddBtn = document.querySelector('.btn-add');
    if (todoAddBtn) {
        todoAddBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const todoList = document.querySelector('.todo-list ul');
            const newItem = document.createElement('li');
            const itemId = 'todo' + (document.querySelectorAll('.todo-list li').length + 1);
            
            newItem.innerHTML = `
                <input type="checkbox" id="${itemId}">
                <label for="${itemId}">New task</label>
            `;
            todoList.appendChild(newItem);
        });
    }
    
    // Right sidebar toggle for mobile
    const rightSidebar = document.querySelector('.right-sidebar');
    const rightSidebarToggle = document.createElement('div');
    rightSidebarToggle.className = 'right-sidebar-toggle';
    rightSidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
    rightSidebarToggle.style.display = 'none';
    
    document.body.appendChild(rightSidebarToggle);
    
    rightSidebarToggle.addEventListener('click', function() {
        rightSidebar.classList.toggle('active');
        this.innerHTML = rightSidebar.classList.contains('active') ? 
            '<i class="fas fa-chevron-right"></i>' : '<i class="fas fa-chevron-left"></i>';
    });
    
    // Show/hide toggle based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 1200) {
            rightSidebarToggle.style.display = 'flex';
            rightSidebar.classList.remove('active');
            rightSidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
        } else {
            rightSidebarToggle.style.display = 'none';
            rightSidebar.classList.add('active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.reload();
        });
    }
    
    // Add smooth transitions to buttons
    const buttons = document.querySelectorAll('button, .btn, a');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});