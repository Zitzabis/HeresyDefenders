// Constructor
function GUI() {}

// Setup GUI components
GUI.prototype.setup = function() {
    this.updateHealth();
    this.updateKillPoints();

    $( "#armourCost" ).html(armourCost);
    $( "#healthCost" ).html(healthCost);

    this.checkShop();
};

// Update health stats
GUI.prototype.updateHealth = function() {
    $('#health').html(characterHealth + "/" + health);
};

// Update kill points
GUI.prototype.updateKillPoints = function() {
    $('#killPoints').html(killPoints);
    this.checkShop(); // Check if can afford anything in shop
};

// Toggle button between active/inactive in shop
GUI.prototype.toggleShopButton = function(button) {
    if ($('#' + button).hasClass("btn-dark")) {
        $('#' + button).removeClass("btn-dark");
        $('#' + button).addClass("btn-success");
    }
    if ($('#' + button).hasClass("btn-success")) {
        $('#' + button).removeClass("btn-success");
        $('#' + button).addClass("btn-dark");
    }
};

// Check shop for any required changes
// Enables/disables buttons based on if kill point quantity
GUI.prototype.checkShop = function() {
    if (killPoints >= armourCost) {
        $('#buyArmour').removeClass("btn-dark");
        $('#buyArmour').addClass("btn-success");
    }
    else {
        $('#buyArmour').removeClass("btn-success");
        $('#buyArmour').addClass("btn-dark");
    }

    if (killPoints >= healthCost) {
        $('#buyHealth').removeClass("btn-dark");
        $('#buyHealth').addClass("btn-success");
    }
    else {
        $('#buyHealth').removeClass("btn-success");
        $('#buyHealth').addClass("btn-dark");
    }
};