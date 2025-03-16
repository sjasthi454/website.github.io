import { NgbCarousel, NgbCarouselConfig, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList, ViewChild, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,FormsModule,MatToolbarModule, MatButtonModule, MatIconModule, NgbCarouselModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [NgbCarouselConfig],
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  

  @ViewChildren('desktopContentSection') details!: QueryList<ElementRef>;
  @ViewChildren('desktopPhoto') photos!: QueryList<ElementRef>;

  private mediaQuery!: gsap.MatchMedia;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initGSAPAnimations();
    }, 0);
  }

  images = [
    'assets/video/partners1.png',
    'assets/video/partners2.png',
  ];

  testimonials = [
    {
      quote: "Ocean Harvest delivers the freshest seafood globally! Our clients love the premium quality and timely shipments.",
      company: "Global Seafood Imports"
    },
    {
      quote: "Consistent quality, sustainable sourcing, and hassle-free logistics. Highly recommended for bulk seafood exports!",
      company: "Blue Ocean Trading"
    },
    {
      quote: "The best seafood exporter we've partnered with! Always fresh, antibiotic-free, and meets global standards.",
      company: "Pacific Fresh Distributors"
    }
  ];
  
	constructor(config: NgbCarouselConfig) {
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

  private initGSAPAnimations(): void {
    this.mediaQuery = gsap.matchMedia();

    this.mediaQuery.add("(min-width: 600px)", () => {
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".right",
      });

      if (!this.details || !this.photos) return;

      const detailElements = this.details.toArray().map(el => el.nativeElement);
      const photoElements = this.photos.toArray().map(el => el.nativeElement);

      gsap.set(photoElements.slice(1), { autoAlpha: 0, yPercent: 100 });

      detailElements.forEach((detail, index) => {
        let headline = detail.querySelector("p");
        let animation = gsap.timeline()
          .to(photoElements[index], { autoAlpha: 1, yPercent: 0, duration: 0.5 })
          .to(photoElements[index - 1], { autoAlpha: 0, yPercent: -100, duration: 0.5 }, "<");

        ScrollTrigger.create({
          trigger: headline,
          start: "top 85%",
          end: "top 70%",
          animation: animation,
          scrub: true,
          markers: false,
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.revert();
    }
  }
}
  

 
