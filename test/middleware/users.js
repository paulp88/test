'use strict';

const middleware = require('../../src/middleware/users.js');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Users middleware', () => {
        const defaultUserId = 'user-id-1';
        let request, response;
        
        beforeEach(() => {
            request = { cookies: {} };
            response = { cookie: () => {} };
        });

        it('if the user already signed in, reads their ID from a cookie and exposes the user on the request', () => {
            // Given
            request.cookies.agentId = defaultUserId;
            //request.cookie('userId', defaultUserId);
            
            // When
            middleware(request, response, () => {});
            // Then
            expect(request.agent).to.exist;
            expect(request.agent.id).to.equal(defaultUserId);
        });

        it('calls the next middleware in the chain', () => {
            // Given
           const next = sinon.spy();
            // When
            middleware(request, {}, next);
            // Then
            expect(next.called).to.be.true;
        });

        it('if the user is not already signed in, ' +
            'creates a new user id and stores it in a cookie', () => {
            // Given
            //request.cookies.userId = undefined;
            request.cookie('userId', undefined);
            response = { cookie: sinon.spy() };
            // When
            middleware(request, response, () => {});
            // Then
            expect(request.agent).to.exist;
            const newUserId = request.agent.id;
            expect(newUserId).to.exist;
            expect(response.cookie.calledWith('userId', newUserId)).to.be.true;
        });
});