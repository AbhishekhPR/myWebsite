/************************************************
 * Navbar Scroll Effect
 * - Adds a "scrolled" class to the navbar when the user scrolls past 50px.
 ************************************************/
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  /************************************************
   * Theme Toggle Button
   * - Toggles the "light-mode" class on the body.
   * - Switches the icon between a sun and a moon.
   ************************************************/
  document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  });
  
  /************************************************
   * Mobile Menu Toggle
   * - Toggles the "active" class on the mobile nav-links.
   * - Switches the hamburger icon between bars and a close icon.
   ************************************************/
  document.getElementById('menuToggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  /************************************************
   * Network Animation (Nodes and Connections)
   * - Creates a network of moving nodes with dynamic connections.
   ************************************************/
  
  /* Node Class: Represents a point in 3D space */
  class Node {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.element = document.createElement('div');
      this.element.className = 'node';
      // Random velocities for movement
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.vz = (Math.random() - 0.5) * 0.3;
    }
  
    update(container) {
      const perspective = 1000;
      const scale = perspective / (perspective + this.z);
      const screenX = this.x * scale + container.clientWidth / 2;
      const screenY = this.y * scale + container.clientHeight / 2;
  
      // Update element position, scale, and opacity
      this.element.style.transform = `translate(${screenX}px, ${screenY}px) scale(${scale})`;
      this.element.style.opacity = scale * 0.8;
  
      // Update position values
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
  
      // Reverse velocity if node goes out of bounds
      if (Math.abs(this.x) > 300) this.vx *= -1;
      if (Math.abs(this.y) > 300) this.vy *= -1;
      if (Math.abs(this.z) > 300) this.vz *= -1;
    }
  }
  
  /* Connection Class: Draws a line between two nodes */
  class Connection {
    constructor(nodeA, nodeB) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.element = document.createElement('div');
      this.element.className = 'connection';
    }
  
    update(container) {
      const perspective = 1000;
      const scaleA = perspective / (perspective + this.nodeA.z);
      const scaleB = perspective / (perspective + this.nodeB.z);
  
      // Calculate screen positions for both nodes
      const ax = this.nodeA.x * scaleA + container.clientWidth / 2;
      const ay = this.nodeA.y * scaleA + container.clientHeight / 2;
      const bx = this.nodeB.x * scaleB + container.clientWidth / 2;
      const by = this.nodeB.y * scaleB + container.clientHeight / 2;
  
      // Compute distance and angle between nodes
      const dx = bx - ax;
      const dy = by - ay;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
  
      // Update connection element style
      this.element.style.width = `${distance}px`;
      this.element.style.transform = `translate(${ax}px, ${ay}px) rotate(${angle}rad)`;
      this.element.style.opacity = Math.max(0, 1 - distance / 300) * 0.5;
    }
  }
  
  /* Initialize the network animation */
  function initNetwork() {
    const container = document.querySelector('.background-container');
    const nodes = [];
    const connections = [];
  
    // Create nodes
    for (let i = 0; i < 30; i++) {
      const node = new Node(
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 600
      );
      container.appendChild(node.element);
      nodes.push(node);
    }
  
    // Create connections between nodes at random
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < 0.2) {
          const connection = new Connection(nodes[i], nodes[j]);
          container.appendChild(connection.element);
          connections.push(connection);
        }
      }
    }
  
    // Animation loop for updating nodes and connections
    function animate() {
      nodes.forEach(node => node.update(container));
      connections.forEach(connection => connection.update(container));
      requestAnimationFrame(animate);
    }
    animate();
  }
  
  // Start network animation when the window loads
  window.addEventListener('load', initNetwork);
  
  /************************************************
   * Smooth Scrolling for Navigation Links
   * - Smoothly scrolls to the target section when a navigation link is clicked.
   ************************************************/
  document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        // Close mobile menu if it's open
        const navContainer = document.querySelector('.nav-links');
        if (navContainer.classList.contains('active')) {
          navContainer.classList.remove('active');
          // Also reset the mobile menu toggle icon to hamburger
          const menuIcon = document.getElementById('menuToggle').querySelector('i');
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
      
  