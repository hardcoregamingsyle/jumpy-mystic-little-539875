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

    describe('Head Section', () => {
        it('must contain charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must contain viewport meta tag with responsive settings', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*\/?>/i);
        });

        it('must contain a title element', () => {
            expect(htmlContent).toMatch(/<title>.*<\/title>/i);
        });

        it('title must contain meaningful text', () => {
            expect(htmlContent).toMatch(/<title>[^\s].*[^\s]<\/title>/i);
        });
    });

    describe('Body Section', () => {
        it('must have an opening body tag', () => {
            expect(htmlContent).toMatch(/<body[^>]*>/i);
        });

        it('must have a closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });

    describe('Document Structure Completeness', () => {
        it('must have a closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });

        it('must have head and body as siblings', () => {
            const headMatch = htmlContent.match(/<head[^>]*>/i);
            const bodyMatch = htmlContent.match(/<body[^>]*>/i);
            expect(headMatch).toBeTruthy();
            expect(bodyMatch).toBeTruthy();
            if (headMatch && bodyMatch) {
                expect(headMatch.index).toBeLessThan(bodyMatch.index);
            }
        });
    });
});
