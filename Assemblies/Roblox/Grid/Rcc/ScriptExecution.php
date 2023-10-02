<?php

// This file defines the ScriptExecution class.

namespace Roblox\Grid\Rcc;

class ScriptExecution {
	public $name;
	public $script;
	public $arguments = [];
	function __construct($name, $script, $arguments = []) {
		$this->name = $name;
		$this->script = $script;
		foreach ($arguments as $arg) {
			array_push($this->arguments, new LuaValue($arg));
		}
	}
}

// EOF