import * as fs from 'fs';
import * as path from 'path';

describe('HUD Radar HTML Structure Tests', () => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
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
            expect(htmlContent).toMatch(/<html[^>]*lang="en"/i);
        });
    });

    describe('Meta Tags', () => {
        it('must have charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta\s+charset=["']UTF-8["']/i);
        });

        it('must have viewport meta tag', () => {
            expect(htmlContent).toMatch(/<meta\s+name=["']viewport["']/i);
        });

        it('must have viewport content with initial-scale=1.0', () => {
            expect(htmlContent).toMatch(/<meta\s+name=["']viewport["']\s+content=["'][^"']*initial-scale=1\.0[^"']*["']/i);
        });

        it('must have viewport content with width=device-width', () => {
            expect(htmlContent).toMatch(/<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*["']/i);
        });
    });

    describe('Title Tag', () => {
        it('must have a title element', () => {
            expect(htmlContent).toMatch(/<title>.*<\/title>/i);
        });

        it('must have non-empty title content', () => {
            expect(htmlContent).toMatch(/<title>\S+.*<\/title>/i);
        });
    });

    describe('Head and Body', () => {
        it('must have opening head tag', () => {
            expect(htmlContent).toMatch(/<head>/i);
        });

        it('must have closing head tag', () => {
            expect(htmlContent).toMatch(/<\/head>/i);
        });

        it('must have opening body tag', () => {
            expect(htmlContent).toMatch(/<body>/i);
        });

        it('must have closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });
});