import * as fs from 'fs';
import * as path from 'path';

describe('HUD Radar HTML Structure Tests', () => {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    let htmlContent: string;

    beforeAll(() => {
        expect(fs.existsSync(htmlPath)).toBe(true);
        htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    });

    describe('Document Type Declaration', () => {
        it('must contain valid HTML5 DOCTYPE declaration', () => {
            expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
        });
    });

    describe('HTML Tag', () => {
        it('must have opening html tag with lang attribute', () => {
            expect(htmlContent).toMatch(/<html[^>]*lang=["'][^"']+["']/i);
        });

        it('must specify English language code', () => {
            expect(htmlContent).toMatch(/lang=["']en["']/i);
        });
    });

    describe('Meta Tags', () => {
        it('must have charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must have viewport meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["']/i);
        });

        it('must have viewport meta tag with width=device-width', () => {
            expect(htmlContent).toMatch(/content=["']width=device-width[^"']*["']/i);
        });

        it('must have viewport meta tag with initial-scale=1.0', () => {
            expect(htmlContent).toMatch(/initial-scale=1\.0/i);
        });
    });

    describe('Title Element', () => {
        it('must have a title element', () => {
            expect(htmlContent).toMatch(/<title>.*<\/title>/i);
        });

        it('must have a non-empty title', () => {
            const match = htmlContent.match(/<title>([^<]*)<\/title>/i);
            expect(match).not.toBeNull();
            expect(match![1].trim().length).toBeGreaterThan(0);
        });
    });

    describe('Body Element', () => {
        it('must have opening body tag', () => {
            expect(htmlContent).toMatch(/<body[^>]*>/i);
        });

        it('must have closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });

    describe('Structural Integrity', () => {
        it('must have head element', () => {
            expect(htmlContent).toMatch(/<head[^>]*>/i);
        });

        it('must have closing head tag', () => {
            expect(htmlContent).toMatch(/<\/head>/i);
        });

        it('must have closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });
    });
});
