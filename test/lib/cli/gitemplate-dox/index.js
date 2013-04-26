/*jshint node:true*/
var T = require('../../../cli');
var gitemplateDox = T.gitemplateDox;

describe('gitemplateDox cli', function() {
  'use strict';

  beforeEach(function() {
    this.bin = T.cli.impulseBin.create();
    this.handler = T.cli.gitemplateDox;

    this.markdown = 'fakeMarkdown';
    this.doxStub = this.stubMany({}, ['set', 'parse', 'build']);
    this.doxStub.build.returns(this.markdown);
    this.stub(gitemplateDox, 'create').returns(this.doxStub);
    this.printStub = this.stub(require('util'), 'print');

    process.argv = ['node', '/to/script', '--input', 'foo', '--output', 'bar'];
  });

  it('should abort on missing options', function() {
    var stub = this.stub(this.bin, 'exitOnMissingOption');
    this.bin.run(T.cli.provider, this.handler);
    stub.should.have.been.calledWithExactly(['input', 'output']);
  });

  it('should store options', function() {
    this.bin.run(T.cli.provider, this.handler);
    this.doxStub.set.should.have.been.calledWithExactly('input', 'foo');
    this.doxStub.set.should.have.been.calledWithExactly('output', 'bar');
  });

  it('should parse the source', function() {
    this.bin.run(T.cli.provider, this.handler);
    this.doxStub.parse.should.have.been.called;
  });

  it('should print the result', function() {
    this.bin.run(T.cli.provider, this.handler);
    this.printStub.should.have.been.calledWithExactly(this.markdown);
  });
});

