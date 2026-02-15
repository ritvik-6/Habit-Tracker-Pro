// State
    let habits = JSON.parse(localStorage.getItem('habitTrackerPro')) || [];
    let currentDate = new Date();
    let viewYear = currentDate.getFullYear();
    let viewMonth = currentDate.getMonth();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    // Save to localStorage
    function saveHabits() {
      localStorage.setItem('habitTrackerPro', JSON.stringify(habits));
    }

    // Date helpers
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function parseDate(dateStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    }

    function isToday(year, month, day) {
      const today = new Date();
      return today.getFullYear() === year && 
             today.getMonth() === month && 
             today.getDate() === day;
    }

    function isFuture(year, month, day) {
      const date = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }

    // Calculate streak
    function calculateStreak(habit) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let streak = 0;
      let date = new Date(today);

      while (true) {
        const dateStr = formatDate(date);
        const status = habit.days[dateStr];
        
        if (status === 'done') {
          streak++;
          date.setDate(date.getDate() - 1);
        } else if (status === 'skip') {
          date.setDate(date.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    }

    // Calculate completion rate for current month
    function calculateCompletion(habit, year, month) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      let possibleDays = 0;
      let completedDays = 0;

      for (let day = 1; day <= daysInMonth; day++) {
        if (!isFuture(year, month, day)) {
          possibleDays++;
          const dateStr = formatDate(new Date(year, month, day));
          if (habit.days[dateStr] === 'done') {
            completedDays++;
          }
        }
      }

      return possibleDays > 0 ? Math.round((completedDays / possibleDays) * 100) : 0;
    }

    // Render month navigation
    function renderMonthNav() {
      document.getElementById('monthYear').textContent = 
        `${monthNames[viewMonth]} ${viewYear}`;
    }

    // Render habits
    function renderHabits() {
      const container = document.getElementById('habitsList');
      
      if (habits.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="emoji">🌱</div>
            <h3>No habits yet!</h3>
            <p>Start tracking your first habit to build better routines.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = habits.map((habit, habitIndex) => {
        const streak = calculateStreak(habit);
        const completion = calculateCompletion(habit, viewYear, viewMonth);
        
        return `
          <div class="habit-card">
            <div class="habit-header">
              <div class="habit-info">
                <div class="habit-name">${habit.name}</div>
                <div class="habit-stats">
                  <div class="stat-badge streak">
                    🔥 ${streak} day streak
                  </div>
                  <div class="stat-badge completion">
                    📈 ${completion}% complete
                  </div>
                </div>
              </div>
              <div class="habit-actions">
                <button class="icon-btn delete" data-habit-index="${habitIndex}" title="Delete habit">
                  🗑️
                </button>
              </div>
            </div>
            <div class="calendar-grid">
              ${renderCalendar(habit, habitIndex)}
            </div>
          </div>
        `;
      }).join('');
    }

    // Render calendar for a habit
    function renderCalendar(habit, habitIndex) {
      const firstDay = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      
      let html = '';
      
      // Day headers
      dayNames.forEach(day => {
        html += `<div class="day-header">${day}</div>`;
      });

      // Empty cells before month starts
      for (let i = 0; i < firstDay; i++) {
        html += `<div class="day-cell empty"></div>`;
      }

      // Days of month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDate(new Date(viewYear, viewMonth, day));
        const status = habit.days[dateStr] || 'empty';
        const todayClass = isToday(viewYear, viewMonth, day) ? 'today' : '';
        const futureClass = isFuture(viewYear, viewMonth, day) ? 'future' : '';
        const statusClass = status !== 'empty' ? status : '';
        
        html += `
          <div class="day-cell ${statusClass} ${todayClass} ${futureClass}" 
               data-habit-index="${habitIndex}"
               data-date="${dateStr}">
            ${day}
          </div>
        `;
      }

      return html;
    }

    // Toggle day status
    function toggleDay(habitIndex, dateStr) {
      const date = parseDate(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date > today) return; // Can't mark future days

      const habit = habits[habitIndex];
      const current = habit.days[dateStr] || 'empty';
      
      // Cycle: empty -> done -> missed -> skip -> empty
      const cycle = {
        'empty': 'done',
        'done': 'missed',
        'missed': 'skip',
        'skip': 'empty'
      };

      habit.days[dateStr] = cycle[current];
      
      saveHabits();
      renderHabits();
      renderStats();
    }

    // Add habit
    function addHabit() {
      const input = document.getElementById('habitInput');
      const name = input.value.trim();
      
      if (!name) return;
      
      habits.push({
        name: name,
        days: {},
        createdAt: new Date().toISOString()
      });
      
      input.value = '';
      saveHabits();
      renderHabits();
      renderStats();
    }

    // Delete habit
    function deleteHabit(index) {
      if (confirm(`Delete "${habits[index].name}"? This cannot be undone.`)) {
        habits.splice(index, 1);
        saveHabits();
        renderHabits();
        renderStats();
      }
    }

    // Render statistics
    function renderStats() {
      if (habits.length === 0) {
        document.getElementById('statsDashboard').style.display = 'none';
        return;
      }
      
      document.getElementById('statsDashboard').style.display = 'block';
      
      let totalDone = 0;
      let totalMissed = 0;
      let totalSkip = 0;
      let totalPossible = 0;

      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      
      habits.forEach(habit => {
        for (let day = 1; day <= daysInMonth; day++) {
          if (!isFuture(viewYear, viewMonth, day)) {
            totalPossible++;
            const dateStr = formatDate(new Date(viewYear, viewMonth, day));
            const status = habit.days[dateStr];
            
            if (status === 'done') totalDone++;
            else if (status === 'missed') totalMissed++;
            else if (status === 'skip') totalSkip++;
          }
        }
      });

      const completionRate = totalPossible > 0 
        ? Math.round((totalDone / totalPossible) * 100) 
        : 0;

      document.getElementById('statsGrid').innerHTML = `
        <div class="stat-card total">
          <span class="stat-value">${completionRate}%</span>
          <span class="stat-label">Completion Rate</span>
        </div>
        <div class="stat-card done">
          <span class="stat-value">${totalDone}</span>
          <span class="stat-label">Done</span>
        </div>
        <div class="stat-card missed">
          <span class="stat-value">${totalMissed}</span>
          <span class="stat-label">Missed</span>
        </div>
        <div class="stat-card skip">
          <span class="stat-value">${totalSkip}</span>
          <span class="stat-label">Skipped</span>
        </div>
      `;

      // Render donut chart
      renderDonutChart(totalDone, totalMissed, totalSkip);
    }

    // Donut Chart
    let habitChart = null;
    
    function renderDonutChart(done, missed, skip) {
      const ctx = document.getElementById('habitChart').getContext('2d');
      
      // Destroy previous chart if it exists
      if (habitChart) {
        habitChart.destroy();
      }

      // Get CSS color values
      const isDark = document.body.classList.contains('dark-mode');
      const textColor = isDark ? '#f1f5f9' : '#1a202c';
      
      // Only render if there's data
      if (done === 0 && missed === 0 && skip === 0) {
        return;
      }

      habitChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Done', 'Missed', 'Skipped'],
          datasets: [{
            data: [done, missed, skip],
            backgroundColor: [
              '#10b981', // success
              '#ef4444', // danger
              '#8b5cf6'  // skip
            ],
            borderWidth: 0,
            hoverOffset: 20
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '70%',
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  size: 14,
                  weight: '500'
                },
                color: textColor,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              cornerRadius: 8,
              titleFont: {
                size: 14,
                weight: '600'
              },
              bodyFont: {
                size: 13
              },
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    // Theme toggle
    function initTheme() {
      const savedTheme = localStorage.getItem('habitTrackerTheme') || 'light';
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
      updateThemeIcon();
    }

    function toggleTheme() {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('habitTrackerTheme', isDark ? 'dark' : 'light');
      updateThemeIcon();
      // Re-render chart with updated colors
      renderStats();
    }

    function updateThemeIcon() {
      const icon = document.getElementById('themeIcon');
      icon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }

    // Month navigation
    function prevMonth() {
      viewMonth--;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
      }
      renderMonthNav();
      renderHabits();
      renderStats();
    }

    function nextMonth() {
      viewMonth++;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
      }
      renderMonthNav();
      renderHabits();
      renderStats();
    }

    function goToToday() {
      const today = new Date();
      viewYear = today.getFullYear();
      viewMonth = today.getMonth();
      renderMonthNav();
      renderHabits();
      renderStats();
    }

    // Event listeners
    document.getElementById('addHabitBtn').addEventListener('click', addHabit);
    document.getElementById('habitInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addHabit();
    });
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('prevMonth').addEventListener('click', prevMonth);
    document.getElementById('nextMonth').addEventListener('click', nextMonth);
    document.getElementById('todayBtn').addEventListener('click', goToToday);


    // Event delegation for delete buttons
    document.getElementById('habitsList').addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.icon-btn.delete');
      if (deleteBtn) {
        const index = parseInt(deleteBtn.dataset.habitIndex);
        deleteHabit(index);
        return;
      }

      // Event delegation for day cells
      const dayCell = e.target.closest('.day-cell');
      if (dayCell && !dayCell.classList.contains('empty') && !dayCell.classList.contains('future')) {
        const habitIndex = parseInt(dayCell.dataset.habitIndex);
        const dateStr = dayCell.dataset.date;
        toggleDay(habitIndex, dateStr);
      }
    });

    // Initialize
    initTheme();
    renderMonthNav();
    renderHabits();
    renderStats();