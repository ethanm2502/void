<?php

// This file defines the Status class. This contains the version and environmentCount variables and it's used for gathering basic information from RCCService processes.

namespace Roblox\Grid\Rcc;

class Status {
	public $version;
	public $environmentCount;
	function __construct($version, $environmentCount) {
		$this->version = $version;
		$this->environmentCount = $environmentCount;
	}
}

// EOF