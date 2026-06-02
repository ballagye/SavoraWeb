<script lang="ts">
	import { onMount } from 'svelte';

	let hidden = $state(false);
	let scrolled = $state(false);
	let isDark = $state(true); // true = section sombre → logo clair
	let menuOpen = $state(false);

	const darkSections = new Set(['hero', 'contact']);
	const sectionOrder = ['hero', 'philosophy', 'manifeste', 'dining', 'reservation', 'contact'];

	onMount(() => {
		let lastY = 0;

		function checkSection() {
			const y = window.scrollY + 10;
			for (const id of [...sectionOrder].reverse()) {
				const el = document.getElementById(id);
				if (el && el.offsetTop <= y) {
					isDark = darkSections.has(id);
					return;
				}
			}
			isDark = true;
		}

		function onScroll() {
			const y = window.scrollY;
			scrolled = y > 20;

			if (y < 80) {
				hidden = false;
			} else if (y > lastY + 4) {
				hidden = true;
			} else if (y < lastY - 4) {
				hidden = false;
			}

			lastY = y;
			checkSection();
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		checkSection();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header
	class:hidden
	class:scrolled
	class:light={!isDark}
	class:menu-open={menuOpen}
>
	<div class="bar">
		<a href="/" class="brand">SAVORA</a>
		<button
			class="burger"
			class:open={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Menu"
		>
			<span></span>
			<span></span>
		</button>
	</div>
	<div class="rule"></div>
</header>

{#if menuOpen}
	<nav class="menu-overlay">
		<div class="menu-inner">
			<div class="menu-links">
				<a href="#philosophy" onclick={closeMenu}>Notre cuisine</a>
				<a href="#manifeste" onclick={closeMenu}>Philosophie</a>
				<a href="#dining" onclick={closeMenu}>Nos menus</a>
				<a href="#reservation" onclick={closeMenu}>Réservation</a>
				<a href="#contact" onclick={closeMenu}>Contact</a>
			</div>
			<div class="menu-foot">
				<span>Restaurant gastronomique</span>
			</div>
		</div>
	</nav>
{/if}

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 200;
		transform: translateY(0);
		transition:
			transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
			background-color 300ms ease,
			color 300ms ease;
	}

	header.hidden {
		transform: translateY(-100%);
	}

	/* ── Backgrounds au scroll ─────────────────────────────────── */
	header.scrolled:not(.menu-open):not(.light) {
		background-color: rgba(10, 6, 2, 0.93);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	header.scrolled:not(.menu-open).light {
		background-color: rgba(251, 240, 218, 0.93);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	header.menu-open {
		background-color: transparent;
	}

	/* ── Bar ───────────────────────────────────────────────────── */
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.125rem 2rem;
		position: relative;
	}

	.rule {
		height: 1px;
		margin: 0 2rem;
		transition: background-color 300ms;
		background-color: rgba(186, 178, 162, 0.12);
	}

	header.light .rule {
		background-color: rgba(30, 16, 5, 0.1);
	}

	/* ── Logo ──────────────────────────────────────────────────── */
	.brand {
		font-family: 'Britney', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		text-decoration: none;
		transition: color 300ms ease;
		color: #fbf0da;
	}

	header.light .brand {
		color: #1e1005;
	}

	/* ── Hamburger ─────────────────────────────────────────────── */
	.burger {
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.burger span {
		display: block;
		width: 24px;
		height: 1px;
		transition:
			background-color 300ms ease,
			transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
			opacity 200ms;
		transform-origin: center;
		background-color: #fbf0da;
	}

	header.light .burger span {
		background-color: #1e1005;
	}

	.burger.open span:first-child {
		transform: translateY(3.5px) rotate(45deg);
	}

	.burger.open span:last-child {
		transform: translateY(-3.5px) rotate(-45deg);
	}

	/* ── Overlay menu ─────────────────────────────────────────── */
	.menu-overlay {
		position: fixed;
		inset: 0;
		background-color: #0e0804;
		z-index: 190;
		animation: slideDown 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes slideDown {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 0% 0);
		}
	}

	.menu-inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 7rem 2.5rem 3.5rem;
	}

	.menu-links {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.menu-links a {
		font-family: 'Britney', sans-serif;
		font-size: clamp(2.75rem, 6.5vw, 5.5rem);
		font-weight: 400;
		color: #fbf0da;
		text-decoration: none;
		line-height: 1.2;
		display: inline-block;
		transition:
			color 200ms,
			transform 200ms;
	}

	.menu-links a:hover {
		color: rgba(186, 178, 162, 0.5);
		transform: translateX(10px);
	}

	.menu-foot span {
		font-family: 'Aeonik', sans-serif;
		font-size: 0.6875rem;
		letter-spacing: 0.12em;
		color: rgba(251, 240, 218, 0.25);
	}
</style>
