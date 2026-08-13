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
            expect(htmlContent).toMatch(/<html[^>]*lang=["'][^"']+['"]/i);
        });

        it('must specify English language code', () => {
            expect(htmlContent).toMatch(/lang=["']en['"]/i);
        });
    });

    describe('Head Section', () => {
        it('must contain meta charset UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8['"]/i);
        });

        it('must contain viewport meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport['"]/i);
        });

        it('must contain title element', () => {
            expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
        });

        it('title must not be empty', () => {
            const match = htmlContent.match(/<title>([^<]*)<\/title>/i);
            expect(match).not.toBeNull();
            if (match) {
                expect(match[1].trim().length).toBeGreaterThan(0);
            }
        });
    });

    describe('Body Section', () => {
        it('must contain opening body tag', () => {
            expect(htmlContent).toMatch(/<body[^>]*>/i);
        });

        it('must contain closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });
});